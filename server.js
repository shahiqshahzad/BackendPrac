import express from "express";
import userRoutes from "./Routes/userRouetes.js";
import authRoutes from "./Routes/authRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { adminVerification, authVerification } from "./middleware/auth.js";

const app = express();
dotenv.config();
connectDB();

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/auth", authVerification, authRoutes);
app.use("/admin", authVerification, adminVerification, adminRoutes);

app.use((req, res, next) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(400);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log("running on port " + port);
});
