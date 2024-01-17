const Like = require("../models/Like"); // Importez le modèle Like

const getAllLikes = async (req, res) => {
  try {
    const likes = await Like.query(); // Utilisation du modèle Like pour accéder à la base de données
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve likes" });
  }
};

const getLike = async (req, res) => {
  const { id } = req.params;
  try {
    const like = await Like.query().findById(id); // Utilisation du modèle Like pour accéder à la base de données
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
    const newLike = await Like.query().insert(req.body); // Utilisation du modèle Like pour accéder à la base de données
    res.json(newLike);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new like" });
  }
};

const updateLike = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedLike = await Like.query().findById(id).patch(req.body); // Utilisation du modèle Like pour accéder à la base de données
    res.json(updatedLike);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the like" });
  }
};

const deleteLike = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLike = await Like.query().deleteById(id); // Utilisation du modèle Like pour accéder à la base de données
    res.json(deletedLike);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the like" });
  }
};

module.exports = {
  getAllLikes,
  getLike,
  createLike,
  updateLike,
  deleteLike,
};
