const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

router
  .route("/")
  .get((req, res) => {
    commentsController.getAllComments(req, res);
  })
  .post((req, res) => {
    commentsController.createComment(req, res);
  })
  .put((req, res) => {
    commentsController.updateComment(req, res);
  })
  .delete((req, res) => {
    commentsController.deleteComment(req, res);
  });

module.exports = router;
