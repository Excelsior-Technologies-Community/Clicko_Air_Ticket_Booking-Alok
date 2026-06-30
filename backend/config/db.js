const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
    console.log(err);
    return;
  }

  console.log("MySQL Connected Successfully");

  const dbName = process.env.DB_NAME || "mydb";
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }

    connection.query(`USE ${dbName}`, (err) => {
      if (err) {
        console.error(`Error switching to database ${dbName}:`, err);
        return;
      }
      console.log(`Using database: ${dbName}`);

      const createTableSql = `
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          subject VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      connection.query(createTableSql, (err) => {
        if (err) {
          console.error("Error creating contacts table:", err);
        } else {
          console.log("Contacts table checked/created successfully");
        }
      });

      // Create company_info table
      const createCompanyInfoTableSql = `
        CREATE TABLE IF NOT EXISTS company_info (
          id INT AUTO_INCREMENT PRIMARY KEY,
          subtitle VARCHAR(255) NOT NULL,
          heading VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          phone1 VARCHAR(50) NOT NULL,
          phone2 VARCHAR(50) NOT NULL,
          email1 VARCHAR(255) NOT NULL,
          email2 VARCHAR(255) NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `;
      connection.query(createCompanyInfoTableSql, (err) => {
        if (err) {
          console.error("Error creating company_info table:", err);
          return;
        }
        console.log("Company info table checked/created successfully");

        // Seed default row if table is empty
        connection.query("SELECT COUNT(*) AS count FROM company_info", (err, rows) => {
          if (err) {
            console.error("Error checking company_info count:", err);
            return;
          }
          if (rows[0].count === 0) {
            const seedSql = `
              INSERT INTO company_info (subtitle, heading, address, phone1, phone2, email1, email2)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const seedValues = [
              "Get In Touch",
              "Our Contact Information",
              "20 Cooper Square, New York, NY 10003",
              "+9 458 526 6589",
              "+3 458 526 6545",
              "info@example.com",
              "clicko@gmail.com"
            ];
            connection.query(seedSql, seedValues, (err) => {
              if (err) {
                console.error("Error seeding company_info:", err);
              } else {
                console.log("Company info seeded successfully");
              }
            });
          }
        });
      });
    });
  });
});

module.exports = connection;