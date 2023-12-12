const knex = require("../knexfile");

const getAllCategories = async (req, res) => {
  try {
    const categories = await knex("categories").select("*");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await knex("categories").where({ id }).first();
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the category" });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = await knex("categories").insert(req.body);
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new category" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await knex("categories")
      .where({ id })
      .update(req.body);
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the category" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await knex("categories").where({ id }).del();
    res.json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the category" });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
