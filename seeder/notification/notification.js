import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import User from "../../model/UserModel.js";
import ProductData from "./notificationData.js";
import Product from "../../model/ProductModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const findAdmin = await User.find({ isAdmin: true });
    console.log(findAdmin);
    const sampleProducts = ProductData.map((product) => {
      return { ...product, adminPost: findAdmin[0]._id };
    });
    console.log(sampleProducts);
    await Product.insertMany(sampleProducts);
    console.log("Data Imported!");
  } catch (error) {
    console.log(error);
  }
};

importData();
