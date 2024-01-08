const knex = require("../knexfile");

const getAllBooks = async (req, res) => {
  try {
    const books = await knex("books").select("*");
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books" });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, description, publication_date, user_id } = req.body;
    const newBook = await knex("books").insert({
      title,
      description,
      publication_date,
      user_id,
    });
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new book" });
  }
};

const postBook = async (req, res) => {
  try {
    const newBook = await knex("books").insert(req.body);
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await knex("books").where({ id }).update(req.body);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the book" });
  }
};

const patchBook = async (req, res) => {
  try {
    const { id } = req.params;
    const patchedBook = await knex("books").where({ id }).update(req.body);
    res.json(patchedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to patch the book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await knex("books").where({ id }).del();
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the book" });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  postBook,
  updateBook,
  patchBook,
  deleteBook,
};
