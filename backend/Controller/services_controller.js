const Services = require("../Model/services");

exports.getServicesSettings = (req, res) => {
  Services.getSettings((err, data) => {
    if (err) {
      console.error("Error fetching services settings:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch services settings."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.updateServicesSettings = (req, res) => {
  const { subtitle, heading, description, more_service_btn_text, bottom_subtitle, bottom_heading, bottom_btn_text } = req.body;

  if (!subtitle || !heading || !description || !more_service_btn_text || !bottom_subtitle || !bottom_heading || !bottom_btn_text) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required settings fields."
    });
  }

  const settingsData = { subtitle, heading, description, more_service_btn_text, bottom_subtitle, bottom_heading, bottom_btn_text };

  Services.updateSettings(settingsData, (err, result) => {
    if (err) {
      console.error("Error updating services settings:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update services settings."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Services settings updated successfully!"
    });
  });
};

exports.getServicesList = (req, res) => {
  Services.getAllServices((err, data) => {
    if (err) {
      console.error("Error fetching services list:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch services list."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.createServiceItem = (req, res) => {
  const { service_number, title, description } = req.body;

  if (!service_number || !title || !description) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required service fields."
    });
  }

  const serviceData = { service_number, title, description };

  Services.createService(serviceData, (err, result) => {
    if (err) {
      console.error("Error creating service item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to create service item."
      });
    }

    return res.status(201).json({
      success: true,
      message: "Service item created successfully!",
      data: { id: result.insertId, ...serviceData }
    });
  });
};

exports.updateServiceItem = (req, res) => {
  const { id } = req.params;
  const { service_number, title, description } = req.body;

  if (!service_number || !title || !description) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required service fields."
    });
  }

  const serviceData = { service_number, title, description };

  Services.updateService(id, serviceData, (err, result) => {
    if (err) {
      console.error("Error updating service item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update service item."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service item updated successfully!"
    });
  });
};

exports.deleteServiceItem = (req, res) => {
  const { id } = req.params;

  Services.deleteService(id, (err, result) => {
    if (err) {
      console.error("Error deleting service item:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to delete service item."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service item deleted successfully!"
    });
  });
};
