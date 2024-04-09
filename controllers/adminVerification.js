const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const User = require("../models/User");

// to verify if the user is admin
const adminVerification = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.userId);

  if (user.isAdmin) {
    res.status(202).json({ msg: "User authorized as admin" });
  } else {
    res.status(401).json({ msg: "User is not authorized as admin" });
  }
});

module.exports = adminVerification;
