const BookingRoadmap = require("../Model/booking_roadmap");

exports.getBookingRoadmapSettings = (req, res) => {
  BookingRoadmap.getSettings((err, data) => {
    if (err) {
      console.error("Error fetching booking roadmap settings:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch booking roadmap settings."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.updateBookingRoadmapSettings = (req, res) => {
  const { subtitle, heading } = req.body;

  if (!subtitle || !heading) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required settings fields."
    });
  }

  const settingsData = { subtitle, heading };

  BookingRoadmap.updateSettings(settingsData, (err, result) => {
    if (err) {
      console.error("Error updating booking roadmap settings:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update booking roadmap settings."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking roadmap settings updated successfully!"
    });
  });
};

exports.getBookingRoadmapSteps = (req, res) => {
  BookingRoadmap.getAllSteps((err, data) => {
    if (err) {
      console.error("Error fetching booking roadmap steps:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch booking roadmap steps."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.createBookingRoadmapStep = (req, res) => {
  const { step_number, title, description } = req.body;

  if (!step_number || !title || !description) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required step fields."
    });
  }

  const stepData = { step_number, title, description };

  BookingRoadmap.createStep(stepData, (err, result) => {
    if (err) {
      console.error("Error creating booking roadmap step:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to create booking roadmap step."
      });
    }

    return res.status(201).json({
      success: true,
      message: "Booking roadmap step created successfully!",
      data: { id: result.insertId, ...stepData }
    });
  });
};

exports.updateBookingRoadmapStep = (req, res) => {
  const { id } = req.params;
  const { step_number, title, description } = req.body;

  if (!step_number || !title || !description) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required step fields."
    });
  }

  const stepData = { step_number, title, description };

  BookingRoadmap.updateStep(id, stepData, (err, result) => {
    if (err) {
      console.error("Error updating booking roadmap step:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update booking roadmap step."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking roadmap step updated successfully!"
    });
  });
};

exports.deleteBookingRoadmapStep = (req, res) => {
  const { id } = req.params;

  BookingRoadmap.deleteStep(id, (err, result) => {
    if (err) {
      console.error("Error deleting booking roadmap step:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to delete booking roadmap step."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking roadmap step deleted successfully!"
    });
  });
};
