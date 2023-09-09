import mongoose from "mongoose";

const socialMediaLinks = mongoose.Schema({
  faceBook: String,
  youtube: String,
  instagram: String,
  twitter: String,
});

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: 1 },
    profileInfo: { type: String },
    profileImage: { type: String },
    isVerified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
