const express = require("express");
const router = express.Router();
const booksController = require("../../controllers/booksController");

router
  .route("/")
  .get(booksController.getAllBooks)
  .post(booksController.createBook);

router
  .route("/:id")
  .put(booksController.updateBook)
  .patch(booksController.patchBook)
  .delete(booksController.deleteBook);

module.exports = router;
