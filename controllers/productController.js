import asyncHanlder from "express-async-handler";

// @desc Get products & required token
// @route Get/api/Product/All
// @access Public
const getProducts = asyncHanlder(async (req, res) => {
  res.send("this is products");
});

export { getProducts };
