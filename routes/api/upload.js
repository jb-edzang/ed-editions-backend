const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../../middlewares/uploadMiddleware");
const Photo = require("../../models/Photo");

router.post("/", uploadMiddleware, async (req, res) => {
  try {
    console.log("Reached upload route successfully");
    const { title, description, price, user_id } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    // Insérez ces données dans la table "photos" en utilisant le modèle Photo
    const insertedPhoto = await Photo.query()
      .insert({
        title: title,
        description: description,
        image_url: imageUrl,
        user_id: user_id,
        price: price,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
        // Utilisation de returning("*") permet de récupérer les données de la nouvelle ligne insérée
      })
      .returning("*");

    console.log("Photo inserted successfully", insertedPhoto);

    res.json({
      success: true,
      message: "Photo uploaded successfully.",
      photo: insertedPhoto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
