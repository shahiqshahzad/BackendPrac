import { validationResult } from "express-validator";
import User from "../model/UserModel.js";
import generatorToken from "../utils/tokenGenrator.js";
import asyncHanlder from "express-async-handler";

const authUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
    const userFind = await User.findOne({ email }).select("-password");
    if (userFind === null) {
      throw new Error("Invalid User");
    } else {
      res.status(200).json({
        _id: userFind._id,
        token: generatorToken(userFind._id),
        firstName: userFind.firstName,
        lastName: userFind.lastName,
        email: userFind.email,
        isAdmin: userFind.isAdmin,
        isVerified: userFind.isVerified,
        createdAt: userFind.createdAt,
        updatedAt: userFind.updatedAt,
      });
    }
  }
});

const authUserRegister = asyncHanlder(async (req, res) => {
  const user = await User.create({
    firstName: "shahiqs",
    lastName: "shaikh",
    email,
    password: "Password@1",
  });
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
});
export { authUser };
