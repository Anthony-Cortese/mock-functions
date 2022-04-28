exports.up = function(knex) {
  return knex.schema.createTable("products", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("product").notNullable();
    tbl.string("company").notNullable();
    tbl.string("location").notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("products");
};
