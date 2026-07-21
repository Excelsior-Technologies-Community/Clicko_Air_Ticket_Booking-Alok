const db = require("../config/db");

const ServiceDetail = {
  // Settings
  getSettings: (callback) => {
    const sql = "SELECT * FROM service_detail_settings LIMIT 1";
    db.query(sql, (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("No service detail settings found"), null);
      callback(null, rows[0]);
    });
  },

  updateSettings: (settingsData, callback) => {
    const sql = `
      UPDATE service_detail_settings 
      SET banner_title = ?, main_heading = ?, main_description = ?, list_heading = ?, list_description = ?, image1 = ?, image2 = ?, bottom_description = ?, faq_heading = ?
      WHERE id = 1
    `;
    const values = [
      settingsData.banner_title,
      settingsData.main_heading,
      settingsData.main_description,
      settingsData.list_heading,
      settingsData.list_description,
      settingsData.image1,
      settingsData.image2,
      settingsData.bottom_description,
      settingsData.faq_heading
    ];
    db.query(sql, values, callback);
  },

  // Checklist
  getAllChecklist: (callback) => {
    const sql = "SELECT * FROM service_detail_checklist ORDER BY id ASC";
    db.query(sql, callback);
  },

  createChecklistItem: (itemData, callback) => {
    const sql = "INSERT INTO service_detail_checklist (item_text) VALUES (?)";
    db.query(sql, [itemData.item_text], callback);
  },

  updateChecklistItem: (id, itemData, callback) => {
    const sql = "UPDATE service_detail_checklist SET item_text = ? WHERE id = ?";
    db.query(sql, [itemData.item_text, id], callback);
  },

  deleteChecklistItem: (id, callback) => {
    const sql = "DELETE FROM service_detail_checklist WHERE id = ?";
    db.query(sql, [id], callback);
  },

  // FAQ
  getAllFaqs: (callback) => {
    const sql = "SELECT * FROM service_detail_faq ORDER BY id ASC";
    db.query(sql, callback);
  },

  createFaqItem: (faqData, callback) => {
    const sql = "INSERT INTO service_detail_faq (question, answer) VALUES (?, ?)";
    db.query(sql, [faqData.question, faqData.answer], callback);
  },

  updateFaqItem: (id, faqData, callback) => {
    const sql = "UPDATE service_detail_faq SET question = ?, answer = ? WHERE id = ?";
    db.query(sql, [faqData.question, faqData.answer, id], callback);
  },

  deleteFaqItem: (id, callback) => {
    const sql = "DELETE FROM service_detail_faq WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = ServiceDetail;
