import express from "express";
import { body } from "express-validator";
import {
  authRegister,
  authUser,
  verifyUser,
} from "../controllers/userController.js";

const router = express.Router();

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

router.get("/verify/:token", verifyUser);

export default router;
