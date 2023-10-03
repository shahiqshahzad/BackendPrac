import asyncHanlder from "express-async-handler";
import Product from "../model/ProductModel.js";
import { validationResult } from "express-validator";
import User from "../model/UserModel.js";
import Category from "../model/CategoryModel.js";
import { populate } from "dotenv";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig.js";
initializeApp(firebaseConfig);

// @desc Get products & get {page and limit} from query params with pagination
// @route Get/product
// @access Public
const getProducts = asyncHanlder(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const product = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("adminPost", "firstName email lastName")
    .populate({
      path: "categoryId",
      populate: {
        path: "adminPostCategory",
        select: "id firstName lastName email ",
      },
    });
  res.json(product);
});

// @desc Product detail and get id from params
// @route Get/product/productId
// @access Public
const productDetail = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  const productDetail = await Product.findById(id)
    .populate("adminPost", "firstName email lastName profileImage")
    .populate({
      path: "categoryId",
      populate: {
        path: "adminPostCategory",
        select: "id firstName lastName email",
      },
    });
  if (productDetail) {
    res.json(productDetail);
  } else {
    throw new Error("Invalid product Id");
  }
});

const addProduct = asyncHanlder(async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
    const checkUser = await User.findById(req.userData._id);
    if (!checkUser) {
      throw new Error("Admin not found");
    }
    if (!req.file) {
      throw new Error("Please add product image file");
    }

    const storage = getStorage();
    const uploadedFile = req.file;

    const storageRef = ref(
      storage,
      "product_images/" + uploadedFile.originalname
    );
    const uploadProductImage = await uploadBytesResumable(
      storageRef,
      uploadedFile.buffer
    );
    const getProfileImage = await getDownloadURL(uploadProductImage.ref);
    const addProduct = new Product({
      name,
      description,
      price,
      stock,
      adminPost: checkUser._id,
      productImage: getProfileImage,
      categoryId: categoryId,
    });
    await addProduct.save();
    res.status(201);
    res.send("Product successfully added");
  }
});

const addCategory = asyncHanlder(async (req, res) => {
  const { name } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
    const checkCategory = await Category.findOne({ name });
    if (checkCategory) {
      res.status(404);
      throw new Error("Category Already Exists");
    }
    if (!req.file) {
      res.status(404);
      throw new Error("Please add category Image");
    }
    const baseUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    const addCategory = new Category({
      name,
      adminPostCategory: req.userData._id,
      categoryImage: baseUrl,
    });
    await addCategory.save();
    res.status(201);
    res.send("Category added successfully");
  }
});

const getCateogries = asyncHanlder(async (req, res) => {
  const getCategory = await Category.find();
  res.json(getCategory);
});
const verifyCategory = asyncHanlder(async (req, res) => {
  const { categoryId } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
    const updatedCategory = await Category.findOneAndUpdate(
      {
        _id: categoryId,
      },
      { isApproved: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(201);
    res.json({ message: "Category verified Successfully" });
  }
});

const verifyProduct = asyncHanlder(async (req, res) => {
  const { productId } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { isActive: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(201);
    res.json({ message: "Product verified Successfully" });
  }
});

const updateProduct = asyncHanlder(async (req, res) => {
  const { productId } = req.params;
  const updatedData = req.body;
  updatedData.isActive = false;
  const findProduct = await Product.findByIdAndUpdate(productId, updatedData, {
    new: true,
  });
  if (findProduct) {
    res.json({ message: "Successfully updated" });
    console.log(findProduct);
  } else {
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  productDetail,
  addProduct,
  addCategory,
  getCateogries,
  verifyCategory,
  verifyProduct,
  updateProduct,
};
