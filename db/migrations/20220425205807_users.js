exports.up = async function(knex, Promise) {
  return await knex.schema.createTable("users", (tbl) => {
    tbl.increments("id").primary();
    tbl
      .string("username")
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
    tbl.timestamps(true, true);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
