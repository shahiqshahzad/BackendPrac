import express from "express";
import multer from "multer";
import { getProfile, updateProfile } from "../controllers/authController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cd) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cd(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/getProfile/:id", getProfile);
router.post("/updateProfile", upload.single("file"), updateProfile);

export default router;
