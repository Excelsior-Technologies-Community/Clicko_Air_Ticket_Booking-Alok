const db = require("../config/db");

const Services = {
  getSettings: (callback) => {
    const sql = "SELECT * FROM services_settings LIMIT 1";
    db.query(sql, (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("No services settings found"), null);
      callback(null, rows[0]);
    });
  },

  updateSettings: (settingsData, callback) => {
    const sql = `
      UPDATE services_settings 
      SET subtitle = ?, heading = ?, description = ?, more_service_btn_text = ?, bottom_subtitle = ?, bottom_heading = ?, bottom_btn_text = ?
      WHERE id = 1
    `;
    const values = [
      settingsData.subtitle,
      settingsData.heading,
      settingsData.description,
      settingsData.more_service_btn_text,
      settingsData.bottom_subtitle,
      settingsData.bottom_heading,
      settingsData.bottom_btn_text
    ];
    db.query(sql, values, callback);
  },

  getAllServices: (callback) => {
    const sql = "SELECT * FROM services_list ORDER BY service_number ASC, id ASC";
    db.query(sql, callback);
  },

  getServiceById: (id, callback) => {
    const sql = "SELECT * FROM services_list WHERE id = ?";
    db.query(sql, [id], (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("Service item not found"), null);
      callback(null, rows[0]);
    });
  },

  createService: (serviceData, callback) => {
    const sql = "INSERT INTO services_list (service_number, title, description) VALUES (?, ?, ?)";
    db.query(sql, [serviceData.service_number, serviceData.title, serviceData.description], callback);
  },

  updateService: (id, serviceData, callback) => {
    const sql = "UPDATE services_list SET service_number = ?, title = ?, description = ? WHERE id = ?";
    db.query(sql, [serviceData.service_number, serviceData.title, serviceData.description, id], callback);
  },

  deleteService: (id, callback) => {
    const sql = "DELETE FROM services_list WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = Services;
