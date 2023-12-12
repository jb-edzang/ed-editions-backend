const knex = require("../knexfile");

const getAllLikes = async (req, res) => {
  try {
    const likes = await knex("likes").select("*");
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve likes" });
  }
};

const getLikeById = async (req, res) => {
  const { id } = req.params;
  try {
    const like = await knex("likes").where({ id }).first();
    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }
    res.json(like);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the like" });
  }
};

const createLike = async (req, res) => {
  try {
    const newLike = await knex("likes").insert(req.body);
    res.json(newLike);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new like" });
  }
};

const updateLike = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedLike = await knex("likes").where({ id }).update(req.body);
    res.json(updatedLike);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the like" });
  }
};

const deleteLike = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLike = await knex("likes").where({ id }).del();
    res.json(deletedLike);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the like" });
  }
};

module.exports = {
  getAllLikes,
  getLikeById,
  createLike,
  updateLike,
  deleteLike,
};
