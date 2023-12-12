const knex = require("../knexfile");

const getAllComments = async (req, res) => {
  try {
    const comments = await knex("comments").select("*");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};

const createComment = async (req, res) => {
  try {
    const newComment = await knex("comments").insert(req.body);
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new comment" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await knex("comments")
      .where({ id })
      .update(req.body);
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await knex("comments").where({ id }).del();
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the comment" });
  }
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};
