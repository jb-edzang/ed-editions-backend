const express = require("express");
const router = express.Router();
const booksController = require("../../controllers/booksController");

router.get("/", booksController.getBook);
router.post("/", booksController.createBook);

module.exports = router;
