const db = require("../config/db");

const FAQ = {
  getSettings: (callback) => {
    const sql = "SELECT * FROM faq_settings LIMIT 1";
    db.query(sql, (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("No FAQ settings found"), null);
      callback(null, rows[0]);
    });
  },

  updateSettings: (settingsData, callback) => {
    const sql = `
      UPDATE faq_settings 
      SET subtitle = ?, heading = ?, description = ?, image = ?
      WHERE id = 1
    `;
    const values = [
      settingsData.subtitle,
      settingsData.heading,
      settingsData.description,
      settingsData.image
    ];
    db.query(sql, values, callback);
  },

  getAllAccordion: (callback) => {
    const sql = "SELECT * FROM faq_accordion ORDER BY id ASC";
    db.query(sql, callback);
  },

  getAccordionById: (id, callback) => {
    const sql = "SELECT * FROM faq_accordion WHERE id = ?";
    db.query(sql, [id], (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("Accordion item not found"), null);
      callback(null, rows[0]);
    });
  },

  createAccordion: (accData, callback) => {
    const sql = "INSERT INTO faq_accordion (question, answer) VALUES (?, ?)";
    db.query(sql, [accData.question, accData.answer], callback);
  },

  updateAccordion: (id, accData, callback) => {
    const sql = "UPDATE faq_accordion SET question = ?, answer = ? WHERE id = ?";
    db.query(sql, [accData.question, accData.answer, id], callback);
  },

  deleteAccordion: (id, callback) => {
    const sql = "DELETE FROM faq_accordion WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = FAQ;
