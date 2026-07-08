const BestDeal = require("../Model/best_deal");

exports.getBestDeal = (req, res) => {
  BestDeal.get((err, data) => {
    if (err) {
      console.error("Error fetching best deal info:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch best deal information."
      });
    }
    return res.status(200).json({
      success: true,
      data
    });
  });
};

exports.updateBestDeal = (req, res) => {
  const { subtitle, heading, metric1_val, metric1_lbl, metric2_val, metric2_lbl, video_url } = req.body;

  if (!subtitle || !heading || !metric1_val || !metric1_lbl || !metric2_val || !metric2_lbl || !video_url) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields."
    });
  }

  const bestDealData = { subtitle, heading, metric1_val, metric1_lbl, metric2_val, metric2_lbl, video_url };

  BestDeal.update(bestDealData, (err, result) => {
    if (err) {
      console.error("Error updating best deal info:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update best deal information."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Best deal information updated successfully!"
    });
  });
};
