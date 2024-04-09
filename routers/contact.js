const express = require("express");
const router = express.Router();

const {
  postContactDetails,
  getContactDetails,
} = require("../controllers/contact");

// routes
router.post("/postcontactdata", postContactDetails);

router.get("/getcontactdata", getContactDetails);

module.exports = router;
