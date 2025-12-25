import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import profileRoutes from "./routes/profiles.js";

dotenv.config();

const app = express();

/* ===============================
   MIDDLEWARES (MUST BE FIRST)
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use("/api/profiles", profileRoutes);

/* ===============================
   TEST ROUTE
================================ */
app.get("/", (req, res) => {
  res.send("API is running");
});

/* ===============================
   SERVER + DATABASE
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
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });
