import Knex from "knex";

const knex = Knex({ client: "pg" });

export function main() {
  const query = knex("users")
    .where({
      title: "username",
      lang: "eng",
    })
    .select()
    .from()
    .where()
    .first()
    .then()
    .orderBy("date", "desc")
    .toNative();
}

export function products() {
  const query = knex("products")
    .where({
      title: "product",
      lang: "eng",
    })
    .select()
    .from()
    .where()
    .first()
    .then()
    .orderBy("date", "desc")
    .toNative();
}
