import asyncHanlder from "express-async-handler";
import User from "../model/UserModel.js";
import mongoose from "mongoose";

const accountAuth = (req, res) => {
  res.send("this is accountAuth");
};
const getProfile = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("invalid id");

  const findUser = await User.findById(id).select("-password");
  if (findUser) {
    res.json(findUser);
  } else {
    throw new Error("Invalid User");
  }
});

const updateProfile = asyncHanlder(async (req, res) => {
  res.send("update profile");
});
export { accountAuth, getProfile, updateProfile };
