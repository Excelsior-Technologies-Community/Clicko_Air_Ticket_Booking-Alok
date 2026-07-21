const express = require("express");
const router = express.Router();
const serviceDetailController = require("../Controller/service_detail_controller");

// Settings
router.get("/service-detail-settings", serviceDetailController.getSettings);
router.put("/service-detail-settings", serviceDetailController.updateSettings);

// Checklist
router.get("/service-detail-checklist", serviceDetailController.getChecklist);
router.post("/service-detail-checklist", serviceDetailController.createChecklistItem);
router.put("/service-detail-checklist/:id", serviceDetailController.updateChecklistItem);
router.delete("/service-detail-checklist/:id", serviceDetailController.deleteChecklistItem);

// FAQ
router.get("/service-detail-faq", serviceDetailController.getFaqs);
router.post("/service-detail-faq", serviceDetailController.createFaqItem);
router.put("/service-detail-faq/:id", serviceDetailController.updateFaqItem);
router.delete("/service-detail-faq/:id", serviceDetailController.deleteFaqItem);

module.exports = router;
