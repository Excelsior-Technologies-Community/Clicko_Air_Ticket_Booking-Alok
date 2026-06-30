const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const contactRoutes = require("./Routes/contact_routes");
const companyInfoRoutes = require("./Routes/company_info_routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);
app.use("/api", companyInfoRoutes);

app.get("/", (req, res) => {
  res.send("Node + MySQL Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});