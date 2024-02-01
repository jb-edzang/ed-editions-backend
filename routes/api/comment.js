const express = require("express");
const router = express.Router();
const commentsController = require("../../controllers/commentsController");
const { logger } = require("../../middlewares/logger");

router
  .get("/", commentsController.getAllComments)
  .post("/", commentsController.createComment)
  .put("/", commentsController.updateComment)
  .delete("/", commentsController.deleteComment);

module.exports = router;
