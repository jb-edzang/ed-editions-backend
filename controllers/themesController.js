const knex = require("../knexfile");

const getAllThemes = async (req, res) => {
  try {
    const themes = await knex("themes").select("*");
    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve themes" });
  }
};

const getThemeById = async (req, res) => {
  const { id } = req.params;
  try {
    const theme = await knex("themes").where({ id }).first();
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
    const newTheme = await knex("themes").insert({ name });
    res.json(newTheme);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new theme" });
  }
};

const updateTheme = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedTheme = await knex("themes").where({ id }).update({ name });
    res.json(updatedTheme);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the theme" });
  }
};

const deleteTheme = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTheme = await knex("themes").where({ id }).del();
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
