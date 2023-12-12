const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../knexfile");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash du mot de passe

    const newUser = await knex("users").insert({
      username,
      email,
      password: hashedPassword,
    });

    // Création du token d'accès
    const accessToken = jwt.sign(
      { id: newUser[0] },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10s", // laisser à 1h
      }
    );

    // Création du refreshToken
    const refreshToken = jwt.sign(
      { id: newUser[0] },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "15s", // l'initialiser à 7d
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
