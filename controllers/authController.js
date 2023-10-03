import asyncHanlder from "express-async-handler";
import User from "../model/UserModel.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { matchPassword } from "../utils/utils.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

passport.use(
  new OAuth2Strategy(
    {
      clientID:
        "555526637291-2o767o0pb2lchfnvt4mn6a2gt1eerf0q.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

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
  const storage = getStorage();
  const uploadedFile = req.file;

  const updatedData = {
    ...rest,
  };
  if (req.file) {
    if (req.userData.profileImage) {
      const storageRefDe = ref(storage, req.userData.profileImage);
      deleteObject(storageRefDe)
        .then(() => {
          console.log("Previous file deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting previous file:", error);
        });
    }
    const storageRef = ref(
      storage,
      "profile_images/" + uploadedFile.originalname
    );
    const uploadTask = await uploadBytesResumable(
      storageRef,
      uploadedFile.buffer
    );
    const getProfileImage = await getDownloadURL(uploadTask.ref);
    updatedData.profileImage = getProfileImage;
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
    scope: ["profile", "email"],
  })(req, res);
});

export { getProfile, updateProfile, changePassword, googleAuth };
