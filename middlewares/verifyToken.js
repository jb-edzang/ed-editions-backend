const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Récupérer le token depuis les en-têtes

  if (!token) {
    return res.status(401).json({ message: "Aucun token fourni" });
  }

  // Vérifier et décoder le token
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }

    // Si le token est valide, ajoutez les données décodées à l'objet request pour une utilisation ultérieure
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
