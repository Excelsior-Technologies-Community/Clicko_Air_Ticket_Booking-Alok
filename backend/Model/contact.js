    const db = require("../config/db");

    const Contact = {

    create: (contactData, callback) => {
        const sql = "INSERT INTO contacts (name, subject, email, phone, message) VALUES (?, ?, ?, ?, ?)";
        const values = [
        contactData.name,
        contactData.subject,
        contactData.email,
        contactData.phone,
        contactData.message
        ];
        db.query(sql, values, callback);
    }
    };

    module.exports = Contact;
