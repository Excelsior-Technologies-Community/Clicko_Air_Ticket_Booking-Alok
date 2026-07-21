const ServiceDetail = require("../Model/service_detail");

// Settings Controllers
exports.getSettings = (req, res) => {
  ServiceDetail.getSettings((err, data) => {
    if (err) {
      console.error("Error fetching service detail settings:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch service detail settings."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.updateSettings = (req, res) => {
  const { banner_title, main_heading, main_description, list_heading, list_description, image1, image2, bottom_description, faq_heading } = req.body;

  if (!banner_title || !main_heading || !main_description || !list_heading || !list_description || !image1 || !image2 || !bottom_description || !faq_heading) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required settings fields."
    });
  }

  const settingsData = { banner_title, main_heading, main_description, list_heading, list_description, image1, image2, bottom_description, faq_heading };

  ServiceDetail.updateSettings(settingsData, (err, result) => {
    if (err) {
      console.error("Error updating service detail settings:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update service detail settings."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service detail settings updated successfully!"
    });
  });
};

// Checklist Controllers
exports.getChecklist = (req, res) => {
  ServiceDetail.getAllChecklist((err, data) => {
    if (err) {
      console.error("Error fetching checklist:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch checklist items."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.createChecklistItem = (req, res) => {
  const { item_text } = req.body;

  if (!item_text) {
    return res.status(400).json({
      success: false,
      message: "Item text is required."
    });
  }

  ServiceDetail.createChecklistItem({ item_text }, (err, result) => {
    if (err) {
      console.error("Error creating checklist item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to create checklist item."
      });
    }

    return res.status(201).json({
      success: true,
      message: "Checklist item created successfully!",
      data: { id: result.insertId, item_text }
    });
  });
};

exports.updateChecklistItem = (req, res) => {
  const { id } = req.params;
  const { item_text } = req.body;

  if (!item_text) {
    return res.status(400).json({
      success: false,
      message: "Item text is required."
    });
  }

  ServiceDetail.updateChecklistItem(id, { item_text }, (err, result) => {
    if (err) {
      console.error("Error updating checklist item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update checklist item."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Checklist item updated successfully!"
    });
  });
};

exports.deleteChecklistItem = (req, res) => {
  const { id } = req.params;

  ServiceDetail.deleteChecklistItem(id, (err, result) => {
    if (err) {
      console.error("Error deleting checklist item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to delete checklist item."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Checklist item deleted successfully!"
    });
  });
};

// FAQ Controllers
exports.getFaqs = (req, res) => {
  ServiceDetail.getAllFaqs((err, data) => {
    if (err) {
      console.error("Error fetching FAQs:", err);
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

exports.createFaqItem = (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({
      success: false,
      message: "Question and answer are required."
    });
  }

  ServiceDetail.createFaqItem({ question, answer }, (err, result) => {
    if (err) {
      console.error("Error creating FAQ item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to create FAQ item."
      });
    }

    return res.status(201).json({
      success: true,
      message: "FAQ item created successfully!",
      data: { id: result.insertId, question, answer }
    });
  });
};

exports.updateFaqItem = (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({
      success: false,
      message: "Question and answer are required."
    });
  }

  ServiceDetail.updateFaqItem(id, { question, answer }, (err, result) => {
    if (err) {
      console.error("Error updating FAQ item:", err);
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

exports.deleteFaqItem = (req, res) => {
  const { id } = req.params;

  ServiceDetail.deleteFaqItem(id, (err, result) => {
    if (err) {
      console.error("Error deleting FAQ item:", err);
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
