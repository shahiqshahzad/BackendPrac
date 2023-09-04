import express from "express";
import { getProfile, addProduct } from "../controllers/adminController.js";

const router = express.Router();
router.get("/addProduct", getProfile);
router.get("/getProduct", addProduct);

export default router;
