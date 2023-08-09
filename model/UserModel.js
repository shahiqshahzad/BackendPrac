import mongoose from "mongoose";

const socialMediaSchema = mongoose.Schema({
  facebookUrl: { type: String, default: null },
  twitterUrl: { type: String, default: null },
  linkedinUrl: { type: String, default: null },
  facebookUrl: { type: String, default: null },
  whatsAppNumber: { type: Number, default: null },
});

const educationSchema = mongoose.Schema({
  degree: {
    type: String,
  },
  university: {
    type: String,
  },
  joiningDate: {
    type: Date,
  },
  passingDate: {
    type: Date,
  },
  description: {
    type: String,
  },
});
const overViewSchema = mongoose.Schema({
  about: { type: String, default: null },
  education: [{ type: String }],
});
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isVerified: { type: Boolean, required: true, default: false },
    profileImg: { type: String },
    socialMedia: socialMediaSchema,
    location: { type: String, default: null },
    overView: [educationSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
