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
