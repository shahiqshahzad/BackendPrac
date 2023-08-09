import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

const authVerification = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader === undefined) {
    res.status(400);
    throw new Error("Authorization token is required ");
  }
  jwt.verify(authHeader, "test", async (err, decode) => {
    if (err) {
      res.status(404);
      throw new Error("Invalid token");
    } else {
      const findUser = await User.findOne({ _id: decode.id }).exec();
      req.user = {
        _id: findUser._id,
        token: authHeader,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
        idAdmin: findUser.isAdmin,
        isVerified: findUser.isVerified,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
      };
      next();
    }
  });
};

export default authVerification;
