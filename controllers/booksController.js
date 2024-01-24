const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.query(); // Utilisation du modèle Book pour récupérer tous les livres
    if (!books || books.length === 0) {
      return res.status(204).json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books" });
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.query().findById(id);
    if (!book) {
      return res.status(204).json({ message: `Book ID ${id} not found` });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the book" });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, description, publication_date, user_id } = req.body;
    const newBook = await Book.query().insert({
      title,
      description,
      publication_date,
      user_id,
    });
    console.log("Result after insertion");
    res.json(newBook);
  } catch (error) {
    console.error("Failed to create a new book", error);
    res.status(500).json({ error: "Failed to create a new book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.query().patchById(id, req.body);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the book" });
  }
};

const patchBook = async (req, res) => {
  try {
    const { id } = req.params;
    const patchedBook = await Book.query().patchById(id, req.body);
    res.json(patchedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to patch the book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.query().deleteById(id);
    if (deletedBook === 0) {
      return res.status(204).json({ message: `Book ID ${id} not found` });
    }
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the book" });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  patchBook,
  deleteBook,
};
