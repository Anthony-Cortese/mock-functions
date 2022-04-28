import pg from "pg";

const connection = pg.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

//USERS
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
      VALUES(?, ?)`[(username, password)]
  );

  return insertId;
}

export async function findUserById(id) {
  const [rows] = await connection
    .promise()
    .query("SELECT * FROM users WHERE id = ?");
  return rows[0];
}

export async function removeUser(id) {
  const [deletedUser] = await connection
    .promise()
    .query("SELECT * FROM users WHERE id = ?");
  return `We hate to see you go ${deletedUser.username}`;
}

//PRODUCTS
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
      VALUES(?, ?, ?)`[(product, company, location)]
  );

  return insertId;
}

export async function updateProduct(product) {
  const [updatedProduct] = await connection.promise().query(
    `UPDATE products 
      SET products
      WHERE product
      RETURNING *`[product]
  );
  return updatedProduct;
}

export async function getProductsById(id) {
  const [rows] = await connection
    .promise()
    .query("SELECT * FROM products WHERE id = ?");
  return rows[0];
}

export async function removeProduct(id) {
  const [deletedProduct] = await connection
    .promise()
    .query("SELECT * FROM products WHERE id = ?");
  return `We hate to see you go ${deletedProduct.product}`;
}
