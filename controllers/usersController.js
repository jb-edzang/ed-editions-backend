const knex = require("../knexfile");

const getUsers = async (req, res) => {
  try {
    const usersData = await knex("users").select("*");
    res.json(usersData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await knex("users").insert(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await knex("users").where({ id }).update(req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await knex("users").where({ id }).del();
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the user" });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
