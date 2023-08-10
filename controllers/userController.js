import { validationResult } from "express-validator";
import User from "../model/UserModel.js";
import generatorToken from "../utils/tokenGenrator.js";
import asyncHanlder from "express-async-handler";
import sendConfirmationEmail from "../utils/emailVerification.js";

const authUser = asyncHanlder(async (req, res) => {
  const { email } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
    const user = await User.findOne({ email });
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generatorToken(user._id),
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user Data");
    }
  }
});

const authRegister = asyncHanlder(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      res.status(401);
      throw new Error("User already exists");
    }
    const registerUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
    await registerUser.save();
    await sendConfirmationEmail(email, generatorToken(registerUser._id));
    await registerUser.save();

    res.status(201);
    res.send("Successfully Registered");
  }
});

const verifyUser = asyncHanlder(async (req, res) => {
  const { token } = req.params;
  console.log(token);
});

export { authUser, authRegister, verifyUser };
