const CompanyInfo = require("../Model/company_info");

exports.getCompanyInfo = (req, res) => {
  CompanyInfo.get((err, data) => {
    if (err) {
      console.error("Error fetching company info:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch company information."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.updateCompanyInfo = (req, res) => {
  const { subtitle, heading, address, phone1, phone2, email1, email2 } = req.body;

  if (!subtitle || !heading || !address || !phone1 || !phone2 || !email1 || !email2) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields: subtitle, heading, address, phone1, phone2, email1, email2."
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email1) || !emailRegex.test(email2)) {
    return res.status(400).json({
      success: false,
      message: "Please enter valid email addresses."
    });
  }

  const infoData = { subtitle, heading, address, phone1, phone2, email1, email2 };

  CompanyInfo.update(infoData, (err, result) => {
    if (err) {
      console.error("Error updating company info:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update company information."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company information updated successfully!"
    });
  });
};
