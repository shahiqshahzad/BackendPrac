import express from "express";
import { body } from "express-validator";
import {
  authRegister,
  authUser,
  verifyUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(403);
  throw new Error("Invalid Email and Message");
});

router.post(
  "/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  authUser
);

router.post(
  "/register",
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("password").notEmpty(),
  authRegister
);

router.get("register/:token", verifyUser);

export default router;
