const db = require("../config/db");

const BestDeal = {
  get: (callback) => {
    const sql = "SELECT * FROM best_deal LIMIT 1";
    db.query(sql, (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(new Error("No best deal info found"), null);
      callback(null, rows[0]);
    });
  },

  update: (bestDealData, callback) => {
    const sql = `
      UPDATE best_deal 
      SET subtitle = ?, heading = ?, metric1_val = ?, metric1_lbl = ?, metric2_val = ?, metric2_lbl = ?, video_url = ?
      WHERE id = 1
    `;
    const values = [
      bestDealData.subtitle,
      bestDealData.heading,
      bestDealData.metric1_val,
      bestDealData.metric1_lbl,
      bestDealData.metric2_val,
      bestDealData.metric2_lbl,
      bestDealData.video_url
    ];
    db.query(sql, values, callback);
  }
};

module.exports = BestDeal;
