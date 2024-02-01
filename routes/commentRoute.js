const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const { logger } = require("../middlewares/logger");

router
  .route("/")
  .get(logger, commentsController.getAllComments)
  .post(logger, commentsController.createComment);

router
  .route("/:id")
  .put(logger, commentsController.updateComment)
  .get(logger, commentsController.getCommentById)
  .delete(logger, commentsController.deleteComment);

module.exports = router;
