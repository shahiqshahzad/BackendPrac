import express from "express";
import { getProfile, addProduct } from "../controllers/adminController.js";

const router = express.Router();
router.get("/d", getProfile);
router.get("/add-products", addProduct);

export default router;
