const express = require("express");
const router = express.Router();
const companyInfoController = require("../Controller/company_info_controller");

router.get("/company-info", companyInfoController.getCompanyInfo);

router.put("/company-info", companyInfoController.updateCompanyInfo);

module.exports = router;
