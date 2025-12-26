import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profiles.js";

dotenv.config();

const app = express();

/* ===============================
   MIDDLEWARES
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Mongo error:", err.message);
  });
