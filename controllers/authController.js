import asyncHanlder from "express-async-handler";
import User from "../model/UserModel.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { matchPassword } from "../utils/utils.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";

passport.use(
  new OAuth2Strategy(
    {
      clientID:
        "555526637291-2o767o0pb2lchfnvt4mn6a2gt1eerf0q.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);
passport.serializeUser(function (User, done) {
  done(null, User);
});
passport.deserializeUser(function (User, done) {
  done(null, User);
});
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

const googleAuth = asyncHanlder(async (req, res) => {
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })(req, res);
});

const googleCallBack = asyncHanlder(async (req, res) => {
  console.log(req.user);
  res.send("finish");
});

export {
  getProfile,
  updateProfile,
  changePassword,
  googleAuth,
  googleCallBack,
};
