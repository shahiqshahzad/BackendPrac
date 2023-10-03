import express from "express";
import multer from "multer";
import {
  changePassword,
  getProfile,
  googleAuth,
  updateProfile,
} from "../controllers/authController.js";
import { body } from "express-validator";
import passport from "passport";

import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig.js";

const router = express.Router();

initializeApp(firebaseConfig);

const upload = multer({ storage: multer.memoryStorage() });

router.get("/getProfile", getProfile);
router.post("/updateProfile", upload.single("file"), updateProfile);
router.post(
  "/changepassword",
  body("password").notEmpty(),
  body("newpassword").notEmpty(),
  changePassword
);
router.get("/google", googleAuth);
router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    function (req, res) {}
  )
);
export default router;
