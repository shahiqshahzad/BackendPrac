import asyncHanlder from "express-async-handler";

const getProfile = asyncHanlder(async (req, res) => {
  res.send("test");
});

const addProduct = asyncHanlder(async (req, res) => {
  res.send("add product");
});
export { getProfile, addProduct };
