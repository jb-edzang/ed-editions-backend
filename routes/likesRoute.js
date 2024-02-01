const express = require("express");
const router = express.Router();
const { logger } = require("../middlewares/logger");
const likesController = require("../controllers/likesController");

router
  .route("/")
  .get(logger, likesController.getAllLikes)
  .post(logger, likesController.createLike);

router
  .route("/:id")
  .put(logger, likesController.updateLike)
  .get(logger, likesController.getLike)
  .delete(logger, likesController.deleteLike);

module.exports = router;
