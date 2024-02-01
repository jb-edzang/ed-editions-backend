const Comment = require("../models/Comment");

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.query().select();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.query().findById(id);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the comment" });
  }
};

const createComment = async (req, res) => {
  try {
    const newComment = await Comment.query().insert(req.body);
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new comment" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.query().findById(id).patch(req.body);
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.query().deleteById(id);
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the comment" });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
