const knex = require("../knexfile");

const getAllTags = async (req, res) => {
  try {
    const tags = await knex("tags").select("*");
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tags" });
  }
};

const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await knex("tags").where({ id }).first();
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
    const newTag = await knex("tags").insert(req.body);
    res.json(newTag);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new tag" });
  }
};

const updateTag = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTag = await knex("tags").where({ id }).update(req.body);
    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the tag" });
  }
};

const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTag = await knex("tags").where({ id }).del();
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
