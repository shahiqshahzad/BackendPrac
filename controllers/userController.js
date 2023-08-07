import { validationResult } from "express-validator";
import User from "../model/UserModel.js";
import generatorToken from "../utils/tokenGenrator.js";
import asyncHanlder from "express-async-handler";

const authUser = asyncHanlder(async (req, res) => {
  const { email } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
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
  }
});
export { authUser };
