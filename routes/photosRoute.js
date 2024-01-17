const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photosController");

router
  .route("/")
  .get((req, res) => {
    photosController.getAllPhotos(req, res);
  })
  .post((req, res) => {
    photosController.createPhoto(req, res);
  })
  .put((req, res) => {
    photosController.updatePhoto(req, res);
  })
  .delete((req, res) => {
    photosController.deletePhoto(req, res);
  });

router
  .route("/:id")
  .get((req, res) => {
    photosController.getPhotoById(req, res);
  })
  .put((req, res) => {
    photosController.updatePhoto(req, res);
  })
  .patch((req, res) => {
    photosController.patchPhoto(req, res);
  })
  .delete((req, res) => {
    photosController.deletePhoto(req, res);
  });

module.exports = router;
