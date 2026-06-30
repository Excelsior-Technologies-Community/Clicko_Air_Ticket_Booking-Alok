const Contact = require("../Model/contact");

exports.submitContactForm = (req, res) => {
  const { name, subject, email, phone, message } = req.body;

  if (!name || !subject || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields: name, subject, email, phone, message."
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address."
    });
  }

  const contactData = { name, subject, email, phone, message };

  Contact.create(contactData, (err, result) => {
    if (err) {
      console.error("Error inserting contact into database:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to save your message. Please try again later."
      });
    }

    return res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully!",
      contactId: result.insertId
    });
  });
};
