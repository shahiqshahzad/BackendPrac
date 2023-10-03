import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import asyncHanlder from "express-async-handler";

const authVerification = asyncHanlder((req, res, next) => {
  const authHeader = req.headers["token"];
  if (authHeader === undefined) {
    return res.status(400).send({ message: "Authorization token is required" });
  }
  jwt.verify(authHeader, "test", async (err, decode) => {
    if (err) {
      return res.status(400).send({ message: "Invalid token" });
    } else {
      const { id } = decode;
      const user = await User.findOne({ _id: id }).select("-password").exec();
      if (user) {
        req.userData = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          profileImage: user?.profileImage,
        };
        next();
      } else {
        res.status(400);
        res.send("Invalid User");
      }
    }
  });
});

const adminVerification = (req, res, next) => {
  if (req.userData.isAdmin == 2 || req.userData.isAdmin === 3) {
    return next();
  }
  res.status(403);
  throw new Error("Access Denied");
};

const superAdminVerification = (req, res, next) => {
  if (req.userData.isAdmin == 2 || req.userData.isAdmin === 3) {
    return next();
  }
  res.status(403);
  throw new Error("Access Denied");
};

export { authVerification, adminVerification, superAdminVerification };
