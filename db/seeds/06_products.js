exports.seed = async function(knex) {
  return await knex("products")
    .del()
    .then(function() {
      return knex("products")
        .insert([
          {
            id: 1,
            product: "Energy Drink",
            company: "Energizer",
            location: "Utah",
          },

          {
            id: 2,
            product: "Beef Jerky",
            company: "Jerky",
            location: "California",
          },
          {
            id: 3,
            product: "Jersey",
            company: "Vintage Sports",
            location: "Oregon",
          },
        ])
        .into("products");
    });
};
