const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");

const Contact = require("../models/Contact");

// to post contact details
const postContactDetails = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const contact = await Contact.create({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });

  contact.save();

  res.status(201).json({ msg: "Contact details submitted" });
});

// to get all contact details
const getContactDetails = catchAsync(async (req, res, next) => {
  const contactData = await Contact.find({}).sort({ createdAt: -1 });

  res.status(200).send(contactData);
});

module.exports = { postContactDetails, getContactDetails };
