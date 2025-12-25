import express from "express";
import Profile from "../models/Profile.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// GET all profiles (optional: public)
router.get("/", async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

// POST profile (only logged-in)
router.post("/", auth, async (req, res) => {
  const profile = new Profile({ ...req.body, user: req.userId });
  await profile.save();
  res.status(201).json(profile);
});

// PUT profile (only owner)
router.put("/:id", auth, async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  if (profile.user.toString() !== req.userId)
    return res.status(403).json({ message: "Not authorized" });

  Object.assign(profile, req.body);
  await profile.save();
  res.json(profile);
});

// DELETE profile (only owner)
router.delete("/:id", auth, async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  if (profile.user.toString() !== req.userId)
    return res.status(403).json({ message: "Not authorized" });

  await profile.deleteOne();
  res.json({ message: "Profile deleted" });
});

export default router;
