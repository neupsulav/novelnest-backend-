const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const adminVerification = require("../controllers/adminVerification");

// routes
router.get("/isadmin", authentication, adminVerification);

module.exports = router;
