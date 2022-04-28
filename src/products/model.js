const db = require("../../db/db-config");

export async function getProducts() {
  return Promise().query(
    db("products").select("product", "location", "company")
  );
}

export async function createProduct(product, company, location) {
  const { insertId } = await Promise().query(
    `INSERT INTO products (product, company, location)
        VALUES(?, ?, ?)`[(product, company, location)]
  );

  return insertId;
}

export async function updateProduct(id, product) {
  const [updatedProduct] = await Promise().query(
    db("products").where("id", id).update(product, "*")
  );
  return updatedProduct;
}

export async function getProductsById(id) {
  return Promise().query(db("products").where("id", id).first());
}

export async function removeProduct(id) {
  const [deletedProduct] = await Promise().query(
    db("products").select("*").where("id", id).del("*")
  );
  return deletedProduct;
}
