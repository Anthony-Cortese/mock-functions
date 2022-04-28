const db = require("../../db/db-config");

const getUser = () => {
  return Promise().query(db("users").select("id", "username", "password"));
};

const findUserById = (id) => {
  return Promise().query(db("users").where("id", id).first());
};

const createUser = async (username, password) => {
  const { insertId } = await Promise().query(
    `INSERT INTO users (username, password)
        VALUES(?, ?)`[(username, password)]
  );

  return insertId;
};

const removeUser = async (id) => {
  const [deletedUser] = await Promise().query(
    db("user").select("*").where("id", id).del("*")
  );
  return deletedUser;
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

module.exports = {
  getUser,
  findUserById,
  createUser,
  removeUser,
};
