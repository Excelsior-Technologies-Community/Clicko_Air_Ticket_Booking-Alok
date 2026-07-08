const express = require("express");
const router = express.Router();
const contactController = require("../Controller/contact_controller");

router.post("/contact", contactController.submitContactForm);
router.get("/contact", contactController.getContacts);
router.delete("/contact/:id", contactController.deleteContact);
router.post("/contact/reply", contactController.replyToContact);

module.exports = router;
