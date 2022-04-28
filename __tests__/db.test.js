//RUNNING TESTS ON THE TESTING DATABASE FROM ":MEMORY:"
const db = require("../db/db-config");

// beforeAll(async () => {
//   // run the migrations and do any other setup here
//   // await db.migrate.latest()
// });

describe("testing the actual testing database", () => {
  test("select users", async () => {
    let users = await db.from("users").select("username");
    expect(users.length).toEqual(5);
  });

  test("select products", async () => {
    let products = await db.from("products").select("product");
    expect(products.length).toEqual(3);
  });

  test("select products table, and find location", async () => {
    let products = await db.from("products").select("location");
    expect(products.length).toEqual(3);
    expect(products[1].location).toBe("California");
  });
});
