const bcrypt = require("bcrypt");
const User = require("../models/User"); // Importez le modèle User

const signUpController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.query().findOne({ email }); // Utilisation du modèle User pour accéder à la base de données

    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hasher le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10); // Utilisation de bcrypt pour hacher le mot de passe

    await User.query().insert({
      username,
      email,
      password: hashedPassword, // Enregistrement du mot de passe haché
    });

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur." });
  }
};

module.exports = signUpController;
