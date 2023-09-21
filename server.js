import express from "express";
import userRoutes from "./Routes/userRouetes.js";
import authRoutes from "./Routes/authRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import superAdminRoutes from "./Routes/superAdminRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import {
  adminVerification,
  authVerification,
  superAdminVerification,
} from "./middleware/auth.js";

const app = express();
dotenv.config();
connectDB();

const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadFolderPath = path.join(__dirname, "uploads");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadFolderPath));
app.use(cors());

app.use("/user", userRoutes);
app.use("/auth", authVerification, authRoutes);
app.use("/product", productRoutes);
app.use("/admin", authVerification, adminVerification, adminRoutes);
app.use(
  "/superadmin",
  authVerification,
  superAdminVerification,
  adminRoutes,
  superAdminRoutes
);

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
