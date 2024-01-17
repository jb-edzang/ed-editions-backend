const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesController");

router
  .route("/likes")
  .get((req, res) => {
    likesController.getAllLikes(req, res);
  })
  .post((req, res) => {
    likesController.createLike(req, res);
  });

router
  .route("/likes/:id")
  .put((req, res) => {
    likesController.updateLike(req, res);
  })
  .patch((req, res) => {
    likesController.patchLike(req, res);
  })
  .delete((req, res) => {
    likesController.deleteLike(req, res);
  });

module.exports = router;
