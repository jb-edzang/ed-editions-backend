const Photo = require("../models/Photo");

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.query();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve photos" });
  }
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.query().findById(id);

    if (photo) {
      res.json(photo);
    } else {
      res.status(404).json({ error: "Photo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the photo" });
  }
};

const createPhoto = async (req, res) => {
  try {
    const newPhoto = await Photo.query().insert(req.body);
    res.json(newPhoto);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new photo" });
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPhoto = await Photo.query().findById(id).patch(req.body);
    res.json(updatedPhoto);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the photo" });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhoto = await Photo.query().deleteById(id);
    res.json(deletedPhoto);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the photo" });
  }
};

module.exports = {
  getAllPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
