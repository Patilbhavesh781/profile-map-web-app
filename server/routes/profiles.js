import express from "express";
import Profile from "../models/Profile.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   GET ALL PROFILES
================================ */
router.get("/", async (req, res) => {
  const profiles = await Profile.find().sort({ createdAt: -1 });
  res.json(profiles);
});

/* ===============================
   GET SINGLE PROFILE
================================ */
router.get("/:id", async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) return res.status(404).json({ message: "Not found" });
  res.json(profile);
});

/* ===============================
   CREATE PROFILE
================================ */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.create({
      ...req.body,
      user: req.userId,
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Failed to create profile" });
  }
});

/* ===============================
   UPDATE PROFILE (FIXED ✅)
================================ */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Not found" });

    if (profile.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },   // ✅ SAFE UPDATE
      { new: true, runValidators: true }
    );

    res.json(updatedProfile);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

/* ===============================
   DELETE PROFILE
================================ */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Not found" });

    if (profile.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await profile.deleteOne();
    res.json({ message: "Profile deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete profile" });
  }
});

export default router;
