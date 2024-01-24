const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const { logger } = require("../middlewares/logger");

router
  .route("/")
  .get(logger, booksController.getAllBooks)
  .post(logger, booksController.createBook);

router
  .route("/:id")
  .get(logger, booksController.getBook)
  .put(logger, booksController.updateBook)
  .patch(logger, booksController.patchBook)
  .delete(logger, booksController.deleteBook);

module.exports = router;
