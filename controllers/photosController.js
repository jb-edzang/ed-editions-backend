const knex = require("../knexfile");

const getAllPhotos = async (req, res) => {
  try {
    const photos = await knex("photos").select("*");
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve photos" });
  }
};

const createPhoto = async (req, res) => {
  try {
    const newPhoto = await knex("photos").insert(req.body);
    res.json(newPhoto);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new photo" });
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPhoto = await knex("photos").where({ id }).update(req.body);
    res.json(updatedPhoto);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the photo" });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhoto = await knex("photos").where({ id }).del();
    res.json(deletedPhoto);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the photo" });
  }
};

module.exports = {
  getAllPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
