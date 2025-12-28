import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "../routes/auth.js";
import profileRoutes from "../routes/profiles.js";

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);

/* ===============================
   DB CONNECTION
================================ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error", err));

export default app;   // 🔥 REQUIRED FOR VERCEL
