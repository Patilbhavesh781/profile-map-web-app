import express from "express";
import Profile from "../models/Profile.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   GET ALL PROFILES
================================ */
/* ===============================
   GET ALL PROFILES (PAGINATION + FILTERS)
================================ */
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 6,
      search = "",
      minAge,
      maxAge,
      minSalary,
      maxSalary,
      job,
      location,
      sort = "latest",
    } = req.query;

    const query = {};

    /* 🔍 SEARCH */
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { job: { $regex: search, $options: "i" } },
      ];
    }

    /* 🎯 AGE FILTER */
    if (minAge || maxAge) {
      query.age = {};
      if (minAge) query.age.$gte = Number(minAge);
      if (maxAge) query.age.$lte = Number(maxAge);
    }

    /* 💰 SALARY FILTER (SAFE) */
    if (minSalary || maxSalary) {
      query.salary = { $type: "number" };
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    /* 💼 JOB */
    if (job) {
      query.job = { $regex: job, $options: "i" };
    }

    /* 📍 LOCATION */
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    /* 🔃 SORTING */
    let sortOption = { createdAt: -1 };
    if (sort === "ageAsc") sortOption = { age: 1 };
    if (sort === "ageDesc") sortOption = { age: -1 };
    if (sort === "salaryAsc") sortOption = { salary: 1 };
    if (sort === "salaryDesc") sortOption = { salary: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [profiles, total] = await Promise.all([
      Profile.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit)),
      Profile.countDocuments(query),
    ]);

    res.json({
      profiles,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("FETCH PROFILES ERROR:", error);
    res.status(500).json({ message: "Failed to fetch profiles" });
  }
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
