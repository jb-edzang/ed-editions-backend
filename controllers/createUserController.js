const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Importez le modèle User

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash du mot de passe

    // Création d'un nouvel utilisateur via le modèle User
    const newUser = await User.query().insert({
      username,
      email,
      password: hashedPassword,
    });

    // Récupération de l'ID du nouvel utilisateur inséré dans la base de données
    const userId = newUser.id;

    // Création du token d'accès
    const accessToken = jwt.sign(
      { id: userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h", // Changement à 1 heure
      }
    );

    // Création du refreshToken
    const refreshToken = jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d", // Changement à 7 jours
      }
    );

    // Envoi des tokens dans les cookies HTTPOnly
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 3600000 }); // 1 heure
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 604800000,
    }); // 7 jours

    res.json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Impossible de créer un nouvel utilisateur" });
  }
};

module.exports = { createUser };
