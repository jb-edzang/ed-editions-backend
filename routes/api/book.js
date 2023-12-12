const express = require("express");
const router = express.Router();
const booksController = require("../../controllers/booksController");

router
  .route("/books")
  .get(booksController.getAllBooks)
  .post(booksController.createBook);

router
  .route("/books/:id")
  .put(booksController.updateBook)
  .patch(booksController.patchBook)
  .delete(booksController.deleteBook);

module.exports = router;
