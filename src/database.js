import pg from "pg";

const connection = pg.createPool({
  host: "localhost",
  user: "root",
  database: "some_database",
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
export async function getProducts(product) {
  const [rows] = await connection.promise().query(
    `SELECT * 
        FROM products 
        WHERE product = ?`,
    [product]
  );

  return rows[0];
}

export async function createProduct(product, company, location) {
  const { insertId } = await connection.promise().query(
    `INSERT INTO products (product, company, location) 
        VALUES (?, ?)`,
    [product, company, location]
  );

  return insertId;
}

export async function updateProduct(product) {
  const [updatedProduct] = await connection.promise().query(
    `UPDATE products 
        SET products
            WHERE product = ?
            RETURNING *`[product]
  );
  return updatedProduct;
}
