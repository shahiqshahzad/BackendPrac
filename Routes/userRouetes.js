import express from "express";
import { body } from "express-validator";
import { authUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(403);
  throw new Error("Invalid Email and Message");
});

router.post(
  "/login",
  body("email").isEmail(),
  body("name").notEmpty(),
  authUser
);

export default router;
