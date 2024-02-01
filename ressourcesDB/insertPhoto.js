const fs = require("fs").promises;
const path = require("path");
const dbConn = require("../config/dbConn");
const { Model } = require("objection");

// Import the Photo model
const Photo = require("../models/Photo");

Model.knex(dbConn);

async function insertPhotosIntoDatabase() {
  const uploadsFolderPath = path.join(__dirname, "../uploads");

  try {
    // Read the list of files in the "uploads" folder
    const files = await fs.readdir(uploadsFolderPath);

    // Iterate through each file and insert into the database
    for (const file of files) {
      const filePath = path.join(uploadsFolderPath, file);
      const imageBuffer = await fs.readFile(filePath);

      // Insert the photo into the database using the Photo model
      await Photo.query().insert({
        title: file, // You may want to customize this based on your requirements
        description: "Photo description", // Modify this as needed
        user_id: 1, // Replace with the actual user ID
        price: 0.0, // Modify this as needed
        image_data: imageBuffer.toString("base64"),
      });

      console.log(`Inserted ${file} into the database.`);
    }
  } catch (error) {
    console.error("Error inserting photos into the database:", error);
  }
}

module.exports = insertPhotosIntoDatabase;
