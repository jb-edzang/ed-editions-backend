const bcrypt = require("bcrypt");
const knex = require("../knexfile");

const signInController = async (req, res) => {
  const { user, pwd } = req.body;

  try {
    const userExists = await knex("users").where({ user }).first();

    if (userExists) {
      const passwordMatch = await bcrypt.compare(pwd, userExists.pwdHash);

      if (passwordMatch) {
        res.status(200).json({ message: "Authentication successful" });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Sign-in failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signInController;
