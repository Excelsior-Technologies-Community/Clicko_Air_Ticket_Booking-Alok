const AboutInfo = require("../Model/about_info");

exports.getAboutInfo = (req, res) => {
  AboutInfo.get((err, data) => {
    if (err) {
      console.error("Error fetching about info:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch about information."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.updateAboutInfo = (req, res) => {
  const { subtitle, heading, description, feature_title, feature_desc, checklist1, checklist2, image1, image2 } = req.body;

  if (!subtitle || !heading || !description || !feature_title || !feature_desc || !checklist1 || !checklist2) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required text fields."
    });
  }

  const infoData = { subtitle, heading, description, feature_title, feature_desc, checklist1, checklist2, image1, image2 };

  AboutInfo.update(infoData, (err, result) => {
    if (err) {
      console.error("Error updating about info:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update about information."
      });
    }

    return res.status(200).json({
      success: true,
      message: "About information updated successfully!"
    });
  });
};
