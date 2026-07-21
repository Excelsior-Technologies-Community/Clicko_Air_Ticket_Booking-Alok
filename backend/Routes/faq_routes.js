const express = require("express");
const router = express.Router();
const faqController = require("../Controller/faq_controller");
const upload = require("../Middleware/multer");

router.get("/faq-settings", faqController.getFaqSettings);
router.put("/faq-settings", upload.single("image"), faqController.updateFaqSettings);

router.get("/faq-accordion", faqController.getFaqAccordion);
router.post("/faq-accordion", faqController.createFaqAccordion);
router.put("/faq-accordion/:id", faqController.updateFaqAccordion);
router.delete("/faq-accordion/:id", faqController.deleteFaqAccordion);

module.exports = router;
