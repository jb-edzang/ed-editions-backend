const Photo = require("../models/Photo");

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.query();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve photos" });
  }
};

const createPhoto = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { buffer, mimetype } = req.file; // Utilisez buffer et mimetype au lieu de filename

    const newPhoto = await Photo.query().insert({
      title,
      description,
      image_data: buffer, // Utilisez buffer pour stocker les données de l'image
      content_type: mimetype, // Stockez le type de contenu de l'image
    });

    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new photo" });
  }
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.query().findById(id);

    if (photo) {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(photo.image_data, "binary");
    } else {
      res.status(404).json({ error: "Photo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the photo" });
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
