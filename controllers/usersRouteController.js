const User = require("../models/User"); // Import du modèle User

const getUsers = async (req, res) => {
  try {
    const usersData = await User.query(); // Utilisation du modèle User pour récupérer les utilisateurs
    if (!usersData || usersData.length === 0) {
      return res.status(204).json({ message: "No users found" });
    }
    res.json(usersData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.query().findById(id); // Utilisation du modèle User pour récupérer un utilisateur par son ID
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, pwdHash } = req.body;

    // Vérification des données obligatoires
    if (!username || !email || !pwdHash) {
      return res.status(400).json({ error: "Username and email are required" });
    }

    const existingUser = await User.query().findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const newUser = await User.query().insert(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    // Vérification des données obligatoires
    if (!username && !email) {
      return res
        .status(400)
        .json({ error: "Username or email is required for update" });
    }

    const existingUser = await User.query().findOne({ email });
    if (existingUser && existingUser.id !== id) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const updatedUser = await User.query().patchAndFetchById(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: `User ID ${id} not found` });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user" });
  }
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  try {
    const { id } = req.params;
    const deletedUser = await User.query().deleteById(id); // Utilisation du modèle User pour supprimer un utilisateur
    if (deletedUser === 0) {
      return res
        .status(204)
        .json({ message: `User ID ${req.body.id} not found` });
    }
    res.json({ message: `User ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the user" });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
