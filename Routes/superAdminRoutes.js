import express from "express";
import { body } from "express-validator";
import {
  verifyCategory,
  verifyProduct,
} from "../controllers/productController.js";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

router.post(
  "/verifyCategory",
  body("categoryId").notEmpty().isMongoId(),
  verifyCategory
);

router.put(
  "/verifyProduct",
  body("productId").notEmpty().isMongoId(),
  verifyProduct
);
router.get("/getUsers", getUsers);
router.delete("/deleteUser/:id", deleteUser);
router.patch("/updateUser/:id", updateUser);
export default router;
