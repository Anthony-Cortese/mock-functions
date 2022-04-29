const db = require("../../db/db-config");

class UsersModel {
  constructor(id) {
    this.tableName = "users";
    this.id = id;
  }

  async getUser(data) {
    return db(this.tableName)
      .where({ is_deleted: false, ...data })
      .orderBy("created_at", "desc");
  }

  async findUserById(id) {
    return Promise().query(db("users").where("id", id).first());
  }

  async createUser(username, password) {
    const { insertId } = await Promise().query(
      db(this.tableName)
        .insert(Object.assign(data))
        .returning("*")
        .then((rows) => rows[0])
    );

    return insertId;
  }

  async removeUser(id) {
    const [deletedUser] = await Promise().query(
      db("user").select("*").where("id", id).del("*")
    );
    return deletedUser;
  }
}

module.exports = UsersModel;
