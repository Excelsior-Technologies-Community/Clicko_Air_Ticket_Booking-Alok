const express = require("express");
const router = express.Router();
const bookingRoadmapController = require("../Controller/booking_roadmap_controller");

router.get("/booking-roadmap-settings", bookingRoadmapController.getBookingRoadmapSettings);
router.put("/booking-roadmap-settings", bookingRoadmapController.updateBookingRoadmapSettings);

router.get("/booking-roadmap-steps", bookingRoadmapController.getBookingRoadmapSteps);
router.post("/booking-roadmap-steps", bookingRoadmapController.createBookingRoadmapStep);
router.put("/booking-roadmap-steps/:id", bookingRoadmapController.updateBookingRoadmapStep);
router.delete("/booking-roadmap-steps/:id", bookingRoadmapController.deleteBookingRoadmapStep);

module.exports = router;
