import pg from "pg";

const connection = pg.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

export async function getProducts(product) {
  const [rows] = await connection.promise().query(
    `SELECT *
        FROM products
        WHERE product = ${product}`
  );

  return rows[0];
}

export async function createProduct(product, company, location) {
  const { insertId } = await connection.promise().query(
    `INSERT INTO products (product, company, location)
        VALUES (${product}, ${company}, ${location})`
  );

  return insertId;
}

export async function updateProduct(product, location) {
  const [updatedProduct] = await connection.promise().query(
    `UPDATE products
        SET product = ${product}
            WHERE location = ${location}
            `
  );
  return updatedProduct;
}

export async function findProductById(id) {
  const [rows] = await connection
    .promise()
    .query(`SELECT * FROM products WHERE ${id}`);
  return rows[0];
}
