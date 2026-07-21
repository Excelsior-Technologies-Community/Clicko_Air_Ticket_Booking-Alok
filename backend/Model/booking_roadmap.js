const db = require("../config/db");

const BookingRoadmap = {
  getSettings: (callback) => {
    const sql = "SELECT * FROM booking_roadmap_settings LIMIT 1";
    db.query(sql, (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("No booking roadmap settings found"), null);
      callback(null, rows[0]);
    });
  },

  updateSettings: (settingsData, callback) => {
    const sql = `
      UPDATE booking_roadmap_settings 
      SET subtitle = ?, heading = ?
      WHERE id = 1
    `;
    const values = [
      settingsData.subtitle,
      settingsData.heading
    ];
    db.query(sql, values, callback);
  },

  getAllSteps: (callback) => {
    const sql = "SELECT * FROM booking_roadmap_steps ORDER BY step_number ASC, id ASC";
    db.query(sql, callback);
  },

  getStepById: (id, callback) => {
    const sql = "SELECT * FROM booking_roadmap_steps WHERE id = ?";
    db.query(sql, [id], (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("Step not found"), null);
      callback(null, rows[0]);
    });
  },

  createStep: (stepData, callback) => {
    const sql = "INSERT INTO booking_roadmap_steps (step_number, title, description) VALUES (?, ?, ?)";
    db.query(sql, [stepData.step_number, stepData.title, stepData.description], callback);
  },

  updateStep: (id, stepData, callback) => {
    const sql = "UPDATE booking_roadmap_steps SET step_number = ?, title = ?, description = ? WHERE id = ?";
    db.query(sql, [stepData.step_number, stepData.title, stepData.description, id], callback);
  },

  deleteStep: (id, callback) => {
    const sql = "DELETE FROM booking_roadmap_steps WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = BookingRoadmap;
