const Category = require("../models/Category"); // Importez le modèle Category

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.query().select(); // Utilisation du modèle Category pour accéder à la base de données
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.query().findById(id); // Utilisation du modèle Category pour accéder à la base de données
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
    const newCategory = await Category.query().insert(req.body); // Utilisation du modèle Category pour accéder à la base de données
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new category" });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.query().findById(id).patch(req.body); // Utilisation du modèle Category pour accéder à la base de données
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the category" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.query().deleteById(id); // Utilisation du modèle Category pour accéder à la base de données
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
