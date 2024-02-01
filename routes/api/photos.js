const express = require("express");
const router = express.Router();
const photosController = require("../../controllers/photosController");
const multer = require("multer");

// Utilisez Multer pour gérer l'upload des images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .get("/", photosController.getAllPhotos)
  .post("/", upload.single("image_data"), photosController.createPhoto)
  .put("/:id", photosController.updatePhoto)
  .delete("/:id", photosController.deletePhoto);

module.exports = router;
