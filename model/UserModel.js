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
    isAdmin: { type: Boolean, required: true, default: false },
    accountType: {
      type: String,
      enum: ["accounting", "banking", "itsoftware", "marketing"],
    },
    profileInfo: { type: String },
    profileImage: { type: String },
    languages: { type: [String], default: [] },
    location: { type: String },
    documents: { type: [String], default: [] },
    socialMedia: socialMediaLinks,
    isVerified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
