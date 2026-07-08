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

        const createAboutInfoTableSql = `
          CREATE TABLE IF NOT EXISTS about_info (
            id INT AUTO_INCREMENT PRIMARY KEY,
            subtitle VARCHAR(255) NOT NULL,
            heading VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            feature_title VARCHAR(255) NOT NULL,
            feature_desc TEXT NOT NULL,
            checklist1 VARCHAR(255) NOT NULL,
            checklist2 VARCHAR(255) NOT NULL,
            image1 VARCHAR(255),
            image2 VARCHAR(255),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
        `;
        connection.query(createAboutInfoTableSql, (err) => {
          if (err) {
            console.error("Error creating about_info table:", err);
            return;
          }
          console.log("About info table checked/created successfully");

          connection.query("SELECT COUNT(*) AS count FROM about_info", (err, rows) => {
            if (err) {
              console.error("Error checking about_info count:", err);
              return;
            }
            if (rows[0].count === 0) {
              const seedAboutSql = `
                INSERT INTO about_info (subtitle, heading, description, feature_title, feature_desc, checklist1, checklist2, image1, image2)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;
              const seedAboutValues = [
                "Know About Flight",
                "Experience The Luxury Private Jet",
                "Choosing the right private jet is essential for a comfortable, efficient that and travel experience. Whether you're flying for business.",
                "Easy & Quick Booking",
                "right private jet is essential for a comfortable, efficient that and travel experience.",
                "Private Jet Is Essential For A Comfortable",
                "Essential For A Comfortable",
                "https://clicko-html.vercel.app/assets/image/about/about-img-h2.jpg",
                "https://clicko-html.vercel.app/assets/image/about/about-img2-h2.jpg"
              ];
              connection.query(seedAboutSql, seedAboutValues, (err) => {
                if (err) {
                  console.error("Error seeding about_info:", err);
                } else {
                  console.log("About info seeded successfully");
                }
              });
            }
          });

          // Create best_deal table
          const createBestDealTableSql = `
            CREATE TABLE IF NOT EXISTS best_deal (
              id INT AUTO_INCREMENT PRIMARY KEY,
              subtitle VARCHAR(255) NOT NULL,
              heading VARCHAR(255) NOT NULL,
              metric1_val VARCHAR(50) NOT NULL,
              metric1_lbl VARCHAR(255) NOT NULL,
              metric2_val VARCHAR(50) NOT NULL,
              metric2_lbl VARCHAR(255) NOT NULL,
              video_url VARCHAR(255) NOT NULL,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
          `;
          connection.query(createBestDealTableSql, (err) => {
            if (err) {
              console.error("Error creating best_deal table:", err);
              return;
            }
            console.log("Best deal table checked/created successfully");

            // Seed default best_deal row if empty
            connection.query("SELECT COUNT(*) AS count FROM best_deal", (err, rows) => {
              if (err) {
                console.error("Error checking best_deal count:", err);
                return;
              }
              if (rows[0].count === 0) {
                const seedBestDealSql = `
                  INSERT INTO best_deal (subtitle, heading, metric1_val, metric1_lbl, metric2_val, metric2_lbl, video_url)
                  VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
                const seedBestDealValues = [
                  "Best Deals Offer",
                  "Experience The Luxury Private Jet",
                  "35000", // metric1_val (corresponds to 35K+)
                  "Happy Customers",
                  "100", // metric2_val (corresponds to 100%)
                  "Client Satisfied",
                  "https://www.youtube.com/embed/dQw4w9WgXcQ"
                ];
                connection.query(seedBestDealSql, seedBestDealValues, (err) => {
                  if (err) {
                    console.error("Error seeding best_deal:", err);
                  } else {
                    console.log("Best deal seeded successfully");
                  }
                });
              }
            });
          });
        });
      });
    });
  });
});

module.exports = connection;