const db = require("../config/db");

const AboutInfo = {
  get: (callback) => {
    const sql = "SELECT * FROM about_info LIMIT 1";
    db.query(sql, (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("No about info found"), null);
      callback(null, rows[0]);
    });
  },

  update: (aboutData, callback) => {
    const sql = `
      UPDATE about_info 
      SET subtitle = ?, heading = ?, description = ?, feature_title = ?, feature_desc = ?, checklist1 = ?, checklist2 = ?, image1 = ?, image2 = ?
      WHERE id = 1
    `;
    const values = [
      aboutData.subtitle,
      aboutData.heading,
      aboutData.description,
      aboutData.feature_title,
      aboutData.feature_desc,
      aboutData.checklist1,
      aboutData.checklist2,
      aboutData.image1,
      aboutData.image2
    ];
    db.query(sql, values, callback);
  }
};

module.exports = AboutInfo;
