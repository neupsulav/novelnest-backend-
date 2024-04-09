const Product = require("../models/Product");
const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const { default: mongoose } = require("mongoose");
const Review = require("../models/Review");

// to upload product
const postProduct = catchAsync(async (req, res, next) => {
  const { name, details, currentprice, originalprice } = req.body;

  if (!name || !details || !currentprice) {
    return next(new ErrorHandler("Please fill all the fields properly", 400));
  }

  //   for file
  const files = req.files;
  let imagePaths = [];
  const basepath = `${req.protocol}://${req.get(
    "host"
  )}/public/uploads/productsImages/`;

  if (files) {
    files.map((file) => {
      imagePaths.push(`${basepath}${file.filename}`);
    });
  }

  //   creating posts
  const postProduct = await Product.create({
    name: name,
    details: details,
    currentprice: currentprice,
    originalprice: originalprice,
    images: imagePaths,
  });

  postProduct.save();

  if (!postProduct) {
    return next(new ErrorHandler("Something went wrong", 500));
  }

  res.status(201).json({ msg: "Product listed" });
});

// to delete a product
const deleteProduct = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid product ID", 401));
  }

  const delelteProduct = await Product.findByIdAndDelete({
    _id: req.params.id,
  });

  res.status(200).json({ msg: "Product deleted" });
});

// to fetch all the products
const getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).send(products);
});

// to get a single product
const getProduct = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid product ID", 401));
  }

  const product = await Product.findById({ _id: req.params.id }).populate(
    "reviews"
  );

  res.status(200).send(product);
});

// to add review
const addReview = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid product ID", 401));
  }

  const { rating, reviewContent } = req.body;
  const productId = req.params.id;
  const { userId, name, userImage } = req.user;

  const review = await Review.create({
    username: name,
    userImage: userImage,
    rating: rating,
    reviewContent: reviewContent,
  });

  review.save();

  const addReview = await Product.findByIdAndUpdate(
    { _id: productId },
    {
      $push: { reviews: review._id },
    },
    { new: true }
  );

  res.status(200).json({ msg: "Review added" });
});

module.exports = {
  postProduct,
  deleteProduct,
  getProducts,
  getProduct,
  addReview,
};
