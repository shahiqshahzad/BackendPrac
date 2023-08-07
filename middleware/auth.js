import jwt from "jsonwebtoken";

const authVerification = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader === undefined) {
    res.status(400);
    throw new Error("Authorization token is required ");
  }
  jwt.verify(authHeader, "test", (err) => {
    if (err) {
      res.status(404);
      throw new Error("Invalid token");
    }
  });
  next();
};

export default authVerification;
