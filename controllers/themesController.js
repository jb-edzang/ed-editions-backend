const Theme = require("../models/Theme"); // Importez le modèle Theme

const getAllThemes = async (req, res) => {
  try {
    const themes = await Theme.query(); // Utilisation du modèle Theme pour accéder à la base de données
    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve themes" });
  }
};

const getThemeById = async (req, res) => {
  const { id } = req.params;
  try {
    const theme = await Theme.query().findById(id); // Utilisation du modèle Theme pour accéder à la base de données
    if (!theme) {
      return res.status(404).json({ error: "Theme not found" });
    }
    res.json(theme);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the theme" });
  }
};

const createTheme = async (req, res) => {
  const { name } = req.body;
  try {
    const newTheme = await Theme.query().insert({ name }); // Utilisation du modèle Theme pour accéder à la base de données
    res.json(newTheme);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new theme" });
  }
};

const updateTheme = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedTheme = await Theme.query().patchAndFetchById(id, { name }); // Utilisation du modèle Theme pour accéder à la base de données
    res.json(updatedTheme);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the theme" });
  }
};

const deleteTheme = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTheme = await Theme.query().deleteById(id); // Utilisation du modèle Theme pour accéder à la base de données
    res.json(deletedTheme);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the theme" });
  }
};

module.exports = {
  getAllThemes,
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
};
