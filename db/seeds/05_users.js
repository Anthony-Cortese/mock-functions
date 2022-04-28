exports.seed = async function(knex) {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        { id: 1, username: "Tony", password: "1234" },
        { id: 2, username: "Zed", password: "deft" },
        { id: 3, username: "Ron", password: "1fads" },
        { id: 4, username: "Gabe", password: "fdafd" },
        { id: 5, username: "Natalie", password: "jfldk" },
      ]);
    });
};
