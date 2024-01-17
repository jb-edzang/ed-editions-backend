const Tag = require("../models/Tag"); // Importez le modèle Tag

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.query(); // Utilisation du modèle Tag pour accéder à la base de données
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tags" });
  }
};

const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.query().findById(id); // Utilisation du modèle Tag pour accéder à la base de données
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the tag" });
  }
};

const createTag = async (req, res) => {
  try {
    const newTag = await Tag.query().insert(req.body); // Utilisation du modèle Tag pour accéder à la base de données
    res.json(newTag);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new tag" });
  }
};

const updateTag = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTag = await Tag.query().patchAndFetchById(id, req.body); // Utilisation du modèle Tag pour accéder à la base de données
    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the tag" });
  }
};

const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTag = await Tag.query().deleteById(id); // Utilisation du modèle Tag pour accéder à la base de données
    res.json(deletedTag);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the tag" });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
