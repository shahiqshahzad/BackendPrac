import express from "express";
import {
  accountAuth,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router();
router.get("/account", accountAuth);
router.get("/getProfile/:id", getProfile);
router.post("/updateProfile", updateProfile);

export default router;
