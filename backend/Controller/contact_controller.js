const Contact = require("../Model/contact");
const nodemailer = require("nodemailer");

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

exports.getContacts = (req, res, next) => {
  Contact.getAll((err, results) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({
      success: true,
      data: results
    });
  });
};

exports.deleteContact = (req, res, next) => {
  const { id } = req.params;
  Contact.delete(id, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully."
    });
  });
};

exports.replyToContact = async (req, res, next) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide email, subject, and message fields."
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Clicko Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Re: ${subject}`,
      text: message,
      html: `
        <div style="font-family: 'Outfit', Arial, sans-serif; padding: 25px; background-color: #f8fafc; color: #1e293b; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h2 style="color: #3b82f6; margin-top: 0;">Clicko Support Response</h2>
          <p>Hello,</p>
          <p>Regarding your query about: <strong>"${subject}"</strong>,</p>
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px; white-space: pre-line; margin: 15px 0; font-size: 1rem; line-height: 1.6; color: #334155; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            ${message}
          </div>
          <br/>
          <p style="margin-bottom: 0;">Best regards,</p>
          <p style="margin-top: 5px; font-weight: 700; color: #3b82f6;">Clicko Admin Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Email reply sent successfully!"
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please check SMTP configuration.",
      error: error.message
    });
  }
};

