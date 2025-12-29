import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* ===============================
       BASIC INFO
    ================================ */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 hidden by default
    },

    /* ===============================
       ROLE & STATUS
    ================================ */
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    /* ===============================
       EMAIL VERIFICATION
    ================================ */
    emailCode: String,
    emailCodeExpires: Date,

    /* ===============================
       PASSWORD RESET
    ================================ */
    resetPasswordCode: String,
    resetPasswordExpires: Date,

    /* ===============================
       SECURITY
    ================================ */
    loginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
