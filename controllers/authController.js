import asyncHanlder from "express-async-handler";
import User from "../model/UserModel.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { matchPassword } from "../utils/utils.js";
import bcrypt from "bcryptjs";

const getProfile = asyncHanlder(async (req, res) => {
  const id = req.userData._id;
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
    const baseUrl = `${req.protocol}://${req.get("host")}/${path}`;
    documents = baseUrl;
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
const changePassword = asyncHanlder(async (req, res) => {
  const { password, newpassword } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  }
  const findUser = await User.findOne({ email: req.userData.email });
  if (await matchPassword(findUser.password, password)) {
    findUser.password = bcrypt.hashSync(newpassword, 10);
    await findUser.save();
    res.status(200);
    res.send("Successfully updated");
  } else {
    throw new Error("Invalid Password");
  }
});

export { getProfile, updateProfile, changePassword };
