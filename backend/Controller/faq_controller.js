const FAQ = require("../Model/faq");

exports.getFaqSettings = (req, res) => {
  FAQ.getSettings((err, data) => {
    if (err) {
      console.error("Error fetching FAQ settings:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch FAQ settings."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.updateFaqSettings = (req, res) => {
  const { subtitle, heading, description } = req.body;

  if (!subtitle || !heading || !description) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required text fields."
    });
  }

  let image = req.body.image;
  if (req.file) {
    const host = req.get("host");
    image = `${req.protocol}://${host}/uploads/${req.file.filename}`;
  }

  const settingsData = { subtitle, heading, description, image };

  FAQ.updateSettings(settingsData, (err, result) => {
    if (err) {
      console.error("Error updating FAQ settings:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update FAQ settings."
      });
    }

    return res.status(200).json({
      success: true,
      message: "FAQ settings updated successfully!",
      data: settingsData
    });
  });
};

exports.getFaqAccordion = (req, res) => {
  FAQ.getAllAccordion((err, data) => {
    if (err) {
      console.error("Error fetching FAQ accordion items:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch FAQ items."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.createFaqAccordion = (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({
      success: false,
      message: "Question and answer are required fields."
    });
  }

  FAQ.createAccordion({ question, answer }, (err, result) => {
    if (err) {
      console.error("Error creating FAQ accordion item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to create FAQ item."
      });
    }

    return res.status(201).json({
      success: true,
      message: "FAQ item created successfully!",
      id: result.insertId
    });
  });
};

exports.updateFaqAccordion = (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({
      success: false,
      message: "Question and answer are required fields."
    });
  }

  FAQ.updateAccordion(id, { question, answer }, (err, result) => {
    if (err) {
      console.error("Error updating FAQ accordion item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update FAQ item."
      });
    }

    return res.status(200).json({
      success: true,
      message: "FAQ item updated successfully!"
    });
  });
};

exports.deleteFaqAccordion = (req, res) => {
  const { id } = req.params;

  FAQ.deleteAccordion(id, (err, result) => {
    if (err) {
      console.error("Error deleting FAQ accordion item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to delete FAQ item."
      });
    }

    return res.status(200).json({
      success: true,
      message: "FAQ item deleted successfully!"
    });
  });
};
