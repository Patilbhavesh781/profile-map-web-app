import express from "express";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   ADMIN MIDDLEWARE
================================ */
const adminMiddleware = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

/* ===============================
   GET STATS
================================ */
router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const profilesCount = await Profile.countDocuments();
    const avgAgeAgg = await Profile.aggregate([
      { $group: { _id: null, avgAge: { $avg: "$age" } } },
    ]);
    const avgAge = avgAgeAgg[0]?.avgAge || 0;

    res.json({ users: usersCount, profiles: profilesCount, avgAge });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

/* ===============================
   GET ALL USERS
================================ */
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* ===============================
   DELETE USER
================================ */
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

/* ===============================
   GET ALL PROFILES
================================ */
router.get("/profiles", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profiles" });
  }
});

/* ===============================
   DELETE PROFILE
================================ */
router.delete("/profiles/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete profile" });
  }
});

export default router;
