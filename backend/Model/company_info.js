const db = require("../config/db");

const CompanyInfo = {
  get: (callback) => {
    const sql = "SELECT * FROM company_info LIMIT 1";
    db.query(sql, (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("No company info found"), null);
      callback(null, rows[0]);
    });
  },

  update: (infoData, callback) => {
    const sql = `
      UPDATE company_info 
      SET subtitle = ?, heading = ?, address = ?, phone1 = ?, phone2 = ?, email1 = ?, email2 = ?
      WHERE id = 1
    `;
    const values = [
      infoData.subtitle,
      infoData.heading,
      infoData.address,
      infoData.phone1,
      infoData.phone2,
      infoData.email1,
      infoData.email2
    ];
    db.query(sql, values, callback);
  }
};

module.exports = CompanyInfo;
