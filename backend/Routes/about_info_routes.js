const express = require("express");
const router = express.Router();
const aboutInfoController = require("../Controller/about_info_controller");

router.get("/about-info", aboutInfoController.getAboutInfo);

router.put("/about-info", aboutInfoController.updateAboutInfo);

module.exports = router;
