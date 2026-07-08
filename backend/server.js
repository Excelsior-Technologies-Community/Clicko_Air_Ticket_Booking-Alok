const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const db = require("./config/db");
const contactRoutes = require("./Routes/contact_routes");
const companyInfoRoutes = require("./Routes/company_info_routes");
const aboutInfoRoutes = require("./Routes/about_info_routes");
const bestDealRoutes = require("./Routes/best_deal_routes");
const errorHandler = require("./Middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", contactRoutes);
app.use("/api", companyInfoRoutes);
app.use("/api", aboutInfoRoutes);
app.use("/api", bestDealRoutes);

app.get("/", (req, res) => {
  res.send("Node + MySQL Backend Running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});