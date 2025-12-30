import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profiles.js";

dotenv.config();

const app = express();

/* ===============================
   CORS CONFIG (FIXED)
================================ */
const allowedOrigins = [
  "http://localhost:3000",
  "https://profile-map-app.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman / server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

/* ===============================
   BODY PARSER
================================ */
app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
  });
