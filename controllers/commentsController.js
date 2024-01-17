const Comment = require("../models/Comment"); // Importez le modèle Comment

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.query().select(); // Utilisation du modèle Comment pour accéder à la base de données
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};

const createComment = async (req, res) => {
  try {
    const newComment = await Comment.query().insert(req.body); // Utilisation du modèle Comment pour accéder à la base de données
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new comment" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.query().findById(id).patch(req.body); // Utilisation du modèle Comment pour accéder à la base de données
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.query().deleteById(id); // Utilisation du modèle Comment pour accéder à la base de données
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
