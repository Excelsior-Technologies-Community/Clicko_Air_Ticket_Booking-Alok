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
    },

    getAll: (callback) => {
        const sql = "SELECT * FROM contacts ORDER BY id DESC";
        db.query(sql, callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM contacts WHERE id = ?";
        db.query(sql, [id], callback);
    }
    };

    module.exports = Contact;
