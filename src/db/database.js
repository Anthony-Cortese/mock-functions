import pg from "pg";
import db from "./index"

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
      db("users").select("*").from('users').where("username") = [username]
  );

  return rows[0];
}

export async function createUser(username, password) {
  const { insertId } = await connection.promise().query(
      db("users").insert(username, password).into("users").values([username, password])
    
  );

  return insertId;
}

export async function findUserById(id) {
  const [rows] = await connection.promise().query(
    db("users").where("id", id).first()
  )
  return rows[0]
}

export async function removeUser(id) {
    const [deletedUser] = await connection.promise().query(
      db("user").where("id", id).del("*")
    )
    return `We hate to see you go ${deletedUser.username}`
}




//PRODUCTS
export async function getProducts(product) {
  const [rows] = await connection.promise().query(
      db("products").select("*").from('products').where("product") = [product]
  );
   return rows[0];
}

export async function createProduct(product, company, location) {
  const { insertId } = await connection.promise().query(
    db("products").insert(product, company, location).into("products").values([product, company, location])
    
  );

  return insertId;
}

export async function updateProduct(product) {
  const [updatedProduct] = await connection.promise().query(
    db("products").update("products").set("products").where("product").returning("*") = [product]
  );
  return updatedProduct;
}

export async function getProductsById(id) {
  const [rows] = await connection.promise().query(
    db("products").where("id", id).first()
  )
  return rows[0]
}

module.exports = connection