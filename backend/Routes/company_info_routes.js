const express = require("express");
const router = express.Router();
const companyInfoController = require("../Controller/company_info_controller");

// GET /api/company-info - Get company details
router.get("/company-info", companyInfoController.getCompanyInfo);

// PUT /api/company-info - Update company details
router.put("/company-info", companyInfoController.updateCompanyInfo);

module.exports = router;
