const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");

router
  .route("/")
  .get((req, res) => {
    booksController.getAllBooks(req, res);
  })
  .post((req, res) => {
    booksController.createBook(req, res);
  });

router
  .route("/:id")
  .get((req, res) => {
    booksController.getBook(req, res);
  })
  .put((req, res) => {
    booksController.updateBook(req, res);
  })
  .patch((req, res) => {
    booksController.patchBook(req, res);
  })
  .delete((req, res) => {
    booksController.deleteBook(req, res);
  });

module.exports = router;
