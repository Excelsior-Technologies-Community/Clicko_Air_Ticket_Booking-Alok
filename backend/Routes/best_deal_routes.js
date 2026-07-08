const express = require("express");
const router = express.Router();
const bestDealController = require("../Controller/best_deal_controller");

router.get("/best-deal", bestDealController.getBestDeal);
router.put("/best-deal", bestDealController.updateBestDeal);

module.exports = router;
