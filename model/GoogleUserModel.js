import mongoose from "mongoose";

const GoogleUserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Number, required: true, default: 1 },
  profileInfo: { type: String },
  profileImage: { type: String },
  isVerified: { type: Boolean, required: true, default: false },
});
