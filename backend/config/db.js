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
                  "35000",
                  "Happy Customers",
                  "100",
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

            // Create faq_settings table
            const createFaqSettingsTableSql = `
              CREATE TABLE IF NOT EXISTS faq_settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                subtitle VARCHAR(255) NOT NULL,
                heading VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                image VARCHAR(255) NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
              )
            `;
            connection.query(createFaqSettingsTableSql, (err) => {
              if (err) {
                console.error("Error creating faq_settings table:", err);
                return;
              }
              console.log("FAQ settings table checked/created successfully");

              connection.query("SELECT COUNT(*) AS count FROM faq_settings", (err, rows) => {
                if (err) {
                  console.error("Error checking faq_settings count:", err);
                  return;
                }
                if (rows[0].count === 0) {
                  const seedFaqSettingsSql = `
                    INSERT INTO faq_settings (subtitle, heading, description, image)
                    VALUES (?, ?, ?, ?)
                  `;
                  const seedFaqSettingsValues = [
                    "Faq Questions",
                    "Frequently Ask Questions Of Customer",
                    "Our Goal Each Day Is To Ensure That Our Residents' Needs Are Not Only Met But Exceeded. To Make That Happen.",
                    "https://clicko-html.vercel.app/assets/image/about/faq-img.png"
                  ];
                  connection.query(seedFaqSettingsSql, seedFaqSettingsValues, (err) => {
                    if (err) console.error("Error seeding faq_settings:", err);
                    else console.log("FAQ settings seeded successfully");
                  });
                }
              });

              // Create faq_accordion table
              const createFaqAccordionTableSql = `
                CREATE TABLE IF NOT EXISTS faq_accordion (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  question VARCHAR(255) NOT NULL,
                  answer TEXT NOT NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
              `;
              connection.query(createFaqAccordionTableSql, (err) => {
                if (err) {
                  console.error("Error creating faq_accordion table:", err);
                  return;
                }
                console.log("FAQ accordion table checked/created successfully");

                connection.query("SELECT COUNT(*) AS count FROM faq_accordion", (err, rows) => {
                  if (err) {
                    console.error("Error checking faq_accordion count:", err);
                    return;
                  }
                  if (rows[0].count === 0) {
                    const seedFaqAccSql = `
                      INSERT INTO faq_accordion (question, answer)
                      VALUES (?, ?), (?, ?), (?, ?)
                    `;
                    const seedFaqAccValues = [
                      "Why Do I Need A Professional Email?",
                      "Our Goal Each Day Is To Ensure That Our Residents' Needs Are Not Only Met But Exceeded.",
                      "Compassion New Beginning?",
                      "Our Goal Each Day Is To Ensure That Our Residents' Needs Are Not Only Met But Exceeded.",
                      "Need A Website For My Business?",
                      "Our Goal Each Day Is To Ensure That Our Residents' Needs Are Not Only Met But Exceeded."
                    ];
                    connection.query(seedFaqAccSql, seedFaqAccValues, (err) => {
                      if (err) console.error("Error seeding faq_accordion:", err);
                      else console.log("FAQ accordion seeded successfully");
                    });
                  }

                  // Create services_settings table
                  const createServicesSettingsTableSql = `
                    CREATE TABLE IF NOT EXISTS services_settings (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      subtitle VARCHAR(255) NOT NULL,
                      heading VARCHAR(255) NOT NULL,
                      description TEXT NOT NULL,
                      more_service_btn_text VARCHAR(255) NOT NULL,
                      bottom_subtitle VARCHAR(255) NOT NULL,
                      bottom_heading VARCHAR(255) NOT NULL,
                      bottom_btn_text VARCHAR(255) NOT NULL,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                  `;
                  connection.query(createServicesSettingsTableSql, (err) => {
                    if (err) {
                      console.error("Error creating services_settings table:", err);
                      return;
                    }
                    console.log("Services settings table checked/created successfully");

                    connection.query("SELECT COUNT(*) AS count FROM services_settings", (err, rows) => {
                      if (err) {
                        console.error("Error checking services_settings count:", err);
                        return;
                      }
                      if (rows[0].count === 0) {
                        const seedServicesSettingsSql = `
                          INSERT INTO services_settings (subtitle, heading, description, more_service_btn_text, bottom_subtitle, bottom_heading, bottom_btn_text)
                          VALUES (?, ?, ?, ?, ?, ?, ?)
                        `;
                        const seedServicesSettingsValues = [
                          "Why Choose Us",
                          "Experience Browse By Topic & Service",
                          "Frequently Asked Questions Just One Click Away.",
                          "More Service",
                          "Get Your Air Ticket Booking",
                          "Don't Waste A Second! Call Us Solve Your Any Problem",
                          "Find Solution"
                        ];
                        connection.query(seedServicesSettingsSql, seedServicesSettingsValues, (err) => {
                          if (err) console.error("Error seeding services_settings:", err);
                          else console.log("Services settings seeded successfully");
                        });
                      }
                    });

                    // Create services_list table
                    const createServicesListTableSql = `
                      CREATE TABLE IF NOT EXISTS services_list (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        service_number VARCHAR(50) NOT NULL,
                        title VARCHAR(255) NOT NULL,
                        description TEXT NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                      )
                    `;
                    connection.query(createServicesListTableSql, (err) => {
                      if (err) {
                        console.error("Error creating services_list table:", err);
                        return;
                      }
                      console.log("Services list table checked/created successfully");

                      connection.query("SELECT COUNT(*) AS count FROM services_list", (err, rows) => {
                        if (err) {
                          console.error("Error checking services_list count:", err);
                          return;
                        }
                        if (rows[0].count === 0) {
                          const seedServicesListSql = `
                            INSERT INTO services_list (service_number, title, description)
                            VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)
                          `;
                          const seedServicesListValues = [
                            "01", "Experience Jet Private", "Right Private Jet Is Essential For Comfoable Efficien.",
                            "02", "Air Ticket Reissue Policy", "Right Private Jet Is Essential For Comfoable Efficien.",
                            "03", "Checked Baggage Included", "Right Private Jet Is Essential For Comfoable Efficien.",
                            "04", "Upgrade At Check Airport", "Right Private Jet Is Essential For Comfoable Efficien."
                          ];
                          connection.query(seedServicesListSql, seedServicesListValues, (err) => {
                            if (err) console.error("Error seeding services_list:", err);
                            else console.log("Services list seeded successfully");
                          });
                        }

                        // Create booking_roadmap_settings table
                        const createRoadmapSettingsTableSql = `
                          CREATE TABLE IF NOT EXISTS booking_roadmap_settings (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            subtitle VARCHAR(255) NOT NULL,
                            heading VARCHAR(255) NOT NULL,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                          )
                        `;
                        connection.query(createRoadmapSettingsTableSql, (err) => {
                          if (err) {
                            console.error("Error creating booking_roadmap_settings table:", err);
                            return;
                          }
                          console.log("Booking roadmap settings table checked/created successfully");

                          connection.query("SELECT COUNT(*) AS count FROM booking_roadmap_settings", (err, rows) => {
                            if (err) {
                              console.error("Error checking booking_roadmap_settings count:", err);
                              return;
                            }
                            if (rows[0].count === 0) {
                              const seedSql = `
                                INSERT INTO booking_roadmap_settings (subtitle, heading)
                                VALUES (?, ?)
                              `;
                              connection.query(seedSql, ["Booking Roadmap", "4 Easy Steps Source Incredible Journey"], (err) => {
                                if (err) console.error("Error seeding booking_roadmap_settings:", err);
                                else console.log("Booking roadmap settings seeded successfully");
                              });
                            }
                          });

                          // Create booking_roadmap_steps table
                          const createRoadmapStepsTableSql = `
                            CREATE TABLE IF NOT EXISTS booking_roadmap_steps (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              step_number VARCHAR(50) NOT NULL,
                              title VARCHAR(255) NOT NULL,
                              description TEXT NOT NULL,
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                            )
                          `;
                          connection.query(createRoadmapStepsTableSql, (err) => {
                            if (err) {
                              console.error("Error creating booking_roadmap_steps table:", err);
                              return;
                            }
                            console.log("Booking roadmap steps table checked/created successfully");

                            connection.query("SELECT COUNT(*) AS count FROM booking_roadmap_steps", (err, rows) => {
                              if (err) {
                                console.error("Error checking booking_roadmap_steps count:", err);
                                return;
                              }
                              if (rows[0].count === 0) {
                                const seedStepsSql = `
                                  INSERT INTO booking_roadmap_steps (step_number, title, description)
                                  VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)
                                `;
                                const seedStepsValues = [
                                  "01", "Online Booking", "Mixture Of Metal And Other Elents Hey Generay Provide Dreter.",
                                  "02", "Flight Ticket", "Mixture Of Metal And Other Elents Hey Generay Provide Dreter.",
                                  "03", "Confirm Travel", "Mixture Of Metal And Other Elents Hey Generay Provide Dreter.",
                                  "04", "Easy Payments", "Mixture Of Metal And Other Elents Hey Generay Provide Dreter."
                                ];
                                connection.query(seedStepsSql, seedStepsValues, (err) => {
                                  if (err) console.error("Error seeding booking_roadmap_steps:", err);
                                  else console.log("Booking roadmap steps seeded successfully");
                                });
                              }

                              // Create service_detail_settings table
                              const createServiceDetailSettingsTableSql = `
                                CREATE TABLE IF NOT EXISTS service_detail_settings (
                                  id INT AUTO_INCREMENT PRIMARY KEY,
                                  banner_title VARCHAR(255) NOT NULL,
                                  main_heading VARCHAR(255) NOT NULL,
                                  main_description TEXT NOT NULL,
                                  list_heading VARCHAR(255) NOT NULL,
                                  list_description TEXT NOT NULL,
                                  image1 VARCHAR(255) NOT NULL,
                                  image2 VARCHAR(255) NOT NULL,
                                  bottom_description TEXT NOT NULL,
                                  faq_heading VARCHAR(255) NOT NULL,
                                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                                )
                              `;
                              connection.query(createServiceDetailSettingsTableSql, (err) => {
                                if (err) {
                                  console.error("Error creating service_detail_settings table:", err);
                                  return;
                                }
                                console.log("Service detail settings table checked/created successfully");

                                connection.query("SELECT COUNT(*) AS count FROM service_detail_settings", (err, rows) => {
                                  if (err) {
                                    console.error("Error checking service_detail_settings count:", err);
                                    return;
                                  }
                                  if (rows[0].count === 0) {
                                    const seedDetailSettingsSql = `
                                      INSERT INTO service_detail_settings (banner_title, main_heading, main_description, list_heading, list_description, image1, image2, bottom_description, faq_heading)
                                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                                    `;
                                    const seedDetailSettingsValues = [
                                      "Service Details",
                                      "Departure & Arrival Airports",
                                      "Looking For Flight Status Information For Flights In The USA, Here Are Some Helpful Links And Tips To Distinguish. In Thes Free Hour, When Our Power Of Choice Is Untraelled Data Structures Manages And Dislike Men Who Are Begued Demoralized By The Charms Of Pleasure We Focus On Optimi Zinyg Efficncy Managing Risk Deliveri When Our Power Of Choice Is Untraelled Datsolution Manages And Dislike Men.",
                                      "Included Services",
                                      "Blinded By Desire, That They Cannot Foresee The Pain And Trouble That Are Bound To Ensue Cannot Fors These Hte Case Perfectly Simple And Easy To Distinguish. In A Free Hour, When Our Power Of Choice Is Untraelled Datad Structures Manages And Dislike Men Who Are So Begued & Demoralized By The Charms",
                                      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop",
                                      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
                                      "Blinded By Desire, That They Cannot Foresee The Pain And Trouble That Are Bound To Ensue Cannot Fors These Hte Case Perfectly Simple And Easy To Distinguish. In A Free Hour, When Our Power Of Choice Is Untraelled Data Structures Manages And Dislike Men Who Are So Begued & Demoralized By The Charms",
                                      "FAQs: Your Questions Answered"
                                    ];
                                    connection.query(seedDetailSettingsSql, seedDetailSettingsValues, (err) => {
                                      if (err) console.error("Error seeding service_detail_settings:", err);
                                      else console.log("Service detail settings seeded successfully");
                                    });
                                  }
                                });

                                // Create service_detail_checklist table
                                const createServiceDetailChecklistTableSql = `
                                  CREATE TABLE IF NOT EXISTS service_detail_checklist (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    item_text VARCHAR(255) NOT NULL,
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                  )
                                `;
                                connection.query(createServiceDetailChecklistTableSql, (err) => {
                                  if (err) {
                                    console.error("Error creating service_detail_checklist table:", err);
                                    return;
                                  }
                                  console.log("Service detail checklist table checked/created successfully");

                                  connection.query("SELECT COUNT(*) AS count FROM service_detail_checklist", (err, rows) => {
                                    if (err) {
                                      console.error("Error checking service_detail_checklist count:", err);
                                      return;
                                    }
                                    if (rows[0].count === 0) {
                                      const seedChecklistSql = `
                                        INSERT INTO service_detail_checklist (item_text)
                                        VALUES (?), (?), (?), (?), (?), (?)
                                      `;
                                      const seedChecklistValues = [
                                        "Give Me The Airline",
                                        "For Airspace And National System Updates",
                                        "Flight Number, Departure And Arrival",
                                        "Route Or Flight-Number Search Tool.",
                                        "Departure And Arrival Airports",
                                        "National System Updates In The US, You Can Federal Aviation"
                                      ];
                                      connection.query(seedChecklistSql, seedChecklistValues, (err) => {
                                        if (err) console.error("Error seeding service_detail_checklist:", err);
                                        else console.log("Service detail checklist seeded successfully");
                                      });
                                    }
                                  });

                                  // Create service_detail_faq table
                                  const createServiceDetailFaqTableSql = `
                                    CREATE TABLE IF NOT EXISTS service_detail_faq (
                                      id INT AUTO_INCREMENT PRIMARY KEY,
                                      question VARCHAR(255) NOT NULL,
                                      answer TEXT NOT NULL,
                                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                    )
                                  `;
                                  connection.query(createServiceDetailFaqTableSql, (err) => {
                                    if (err) {
                                      console.error("Error creating service_detail_faq table:", err);
                                      return;
                                    }
                                    console.log("Service detail faq table checked/created successfully");

                                    connection.query("SELECT COUNT(*) AS count FROM service_detail_faq", (err, rows) => {
                                      if (err) {
                                        console.error("Error checking service_detail_faq count:", err);
                                        return;
                                      }
                                      if (rows[0].count === 0) {
                                        const seedFaqSql = `
                                          INSERT INTO service_detail_faq (question, answer)
                                          VALUES (?, ?), (?, ?)
                                        `;
                                        const seedFaqValues = [
                                          "Your Great Destination",
                                          "Blinded By Desire, That They Cannot Foresee The Pain And Trouble That Are Bound To Ensue Cannot Fors These Hte Case Perfectly Simple And Easy To Distinguish. In A Free Hour, When Our Power Of Choice Is Untraelled Data Structures Manages And Dislike Men Who Are So Begued & Demoralized By The Charms",
                                          "Desktop Publishing Packages And Web",
                                          "Blinded By Desire, That They Cannot Foresee The Pain And Trouble That Are Bound To Ensue Cannot Fors These Hte Case Perfectly Simple And Easy To Distinguish. In A Free Hour, When Our Power Of Choice Is Untraelled Data Structures Manages And Dislike Men Who Are So Begued & Demoralized By The Charms"
                                        ];
                                        connection.query(seedFaqSql, seedFaqValues, (err) => {
                                          if (err) console.error("Error seeding service_detail_faq:", err);
                                          else console.log("Service detail faq seeded successfully");
                                        });
                                      }
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

module.exports = connection;