const knex = require("knex");
const configs = require("./knexfile");

const environment = process.env.NODE_ENV || "development";
const configuration = configs[environment];
const db = knex(configuration);

module.exports = {
  db,
};
