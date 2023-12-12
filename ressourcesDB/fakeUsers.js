const faker = require("faker");
const dbConn = require("./server");

const generateFakeUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = {
      user: faker.internet.userName(),
      email: faker.internet.email(),
      pwd: faker.internet.password(),
    };
    users.push(user);
  }
  return users;
};

const insertFakeUsers = async (knex, count) => {
  const fakeUsers = generateFakeUsers(count);
  try {
    const insertedUsers = await knex("users").insert(fakeUsers);
    console.log(`${insertedUsers.length} users inserted`);
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

// Utilisation :
insertFakeUsers(dbConn, 50);
