const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Importez le modèle User

const authUser = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie : ${JSON.stringify(cookies)}`);

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  try {
    const user = await User.query().findOne({ email }); // Utilisation du modèle User pour accéder à la base de données

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Création du token d'accès
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Création du refreshToken
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Envoi des tokens dans les cookies HTTPOnly
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 3600000 }); // 1 heure
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 604800000,
    }); // 7 jours

    res.json({ message: "Authentification réussie" });
  } catch (error) {
    res.status(500).json({ error: "Impossible de se connecter" });
  }
};

module.exports = { authUser };
