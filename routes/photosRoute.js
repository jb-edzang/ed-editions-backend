const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photosController");
const { logger } = require("../middlewares/logger");

router
  .route("/")
  .get(logger, photosController.getAllPhotos)
  .post(logger, photosController.createPhoto)
  .put(logger, photosController.updatePhoto)
  .delete(logger, photosController.deletePhoto);

// Ajoutez ici les routes pour d'autres méthodes liées aux photos...

module.exports = router;
