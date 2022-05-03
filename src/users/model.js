import pg from "pg";

const connection = pg.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

export async function getUser(username) {
  const [rows] = await connection.promise().query(
    `SELECT * 
      FROM users 
      WHERE username = ?`,
    [username]
  );

  return rows[0];
}

export async function createUser(username, password) {
  const { insertId } = await connection.promise().query(
    `INSERT INTO users (username, password) 
      VALUES (?, ?)`,
    [username, password]
  );

  return insertId;
}

export async function updateUser(user) {
  const [updateUser] = await connection.promise().query(
    `UPDATE users 
        SET username = 'New Name'
            WHERE id = ?`[user]
  );
  return updateUser;
}

export async function findUserById(id) {
  const [rows] = await connection
    .promise()
    .query(`SELECT * FROM products WHERE id`[id]);
  return rows[0];
}
