import asyncHanlder from "express-async-handler";
import User from "../model/UserModel.js";
import mongoose from "mongoose";

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
  const { email, ...rest } = req.body;
  let documents = undefined;
  if (req.file) {
    const { originalname, filename, path } = req.file;
    documents = path;
  }
  const updatedData = {
    ...rest,
  };
  if (documents !== undefined) {
    updatedData.documents = documents;
  }

  const result = await User.findOneAndUpdate(
    { _id: req.userData._id },
    { $set: updatedData },
    { new: true }
  ).select("-password");
  res.json(result);
});

export { getProfile, updateProfile };
