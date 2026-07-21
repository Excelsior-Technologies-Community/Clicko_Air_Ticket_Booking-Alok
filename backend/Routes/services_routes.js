const express = require("express");
const router = express.Router();
const servicesController = require("../Controller/services_controller");

router.get("/services-settings", servicesController.getServicesSettings);
router.put("/services-settings", servicesController.updateServicesSettings);

router.get("/services-list", servicesController.getServicesList);
router.post("/services-list", servicesController.createServiceItem);
router.put("/services-list/:id", servicesController.updateServiceItem);
router.delete("/services-list/:id", servicesController.deleteServiceItem);

module.exports = router;
