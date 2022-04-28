const req = require("express/lib/request");
const db = require("../../db/db-config");

const getUser = () => {
  return db("users").select("id", "username", "password");
};

const findUserById = (id) => {
  return db("users").where("id", id).first();
};

// const createUser2 = async (username, password) => {
//   const { userId } = await db("users")
//     .insert({
//       username: req.body.username,
//       password: req.body.password,
//     })
//     .then(() => {});
//   //   `INSERT INTO users (username, password)
//   //       VALUES(?, ?)`
//   return userId;
// };

const createUser = async (username, password) => {
  const { insertId } = await connection.promise().query(
    `INSERT INTO users (username, password)
        VALUES(?, ?)`[(username, password)]
  );

  return insertId;
};

const removeUser = async (id) => {
  const [deletedUser] = await connection
    .promise()
    .query("SELECT * FROM users WHERE id = ?");
  return `We hate to see you go ${deletedUser.username}`;
};

module.exports = {
  getUser,
  findUserById,
  createUser,
  removeUser,
};
