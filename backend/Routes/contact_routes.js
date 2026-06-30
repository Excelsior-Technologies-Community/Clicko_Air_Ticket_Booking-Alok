const express = require("express");
const router = express.Router();
const contactController = require("../Controller/contact_controller");

router.post("/contact", contactController.submitContactForm);

module.exports = router;
