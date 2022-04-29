const db = require("../../db/db-config");

const getUser = () => {
  return db("users").select("id", "username", "password");
};

async function findUserById(id) {
  return Promise().query(db("users").where("id", id).first());
}

async function createUser(username, password) {
  const { insertId } = await Promise().query(
    db("users")
      .insert(username, password)
      .returning("*")
      .then((rows) => rows[0])
  );

  return insertId;
}

async function removeUser(id) {
  const [deletedUser] = await Promise().query(
    db("user").select("*").where("id", id).del("*")
  );
  return deletedUser;
}

module.exports = {
  getUser,
  removeUser,
  createUser,
  findUserById,
};
