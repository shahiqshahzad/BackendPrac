import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

const authVerification = (req, res, next) => {
  const authHeader = req.headers["token"];
  if (authHeader === undefined) {
    res.status(400);
    throw new Error("Authorization token is required ");
  }
  jwt.verify(authHeader, "test", async (err, decode) => {
    if (err) {
      res.status(404);
      throw new Error("Invalid token");
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
        };
        next();
      } else {
        res.status(400);
        res.send("Invalid User");
      }
    }
  });
};

export default authVerification;
