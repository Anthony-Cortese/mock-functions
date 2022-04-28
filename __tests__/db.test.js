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

  describe("locating a user based on their ID", () => {
    afterEach(() => jest.resetAllMocks());

    test("find all users based on their ID", async () => {
      const findUserById = jest.fn().mockResolvedValue({
        data: [
          //test more than 1 instance of username and password
          { id: 1, username: "rick", password: "password1" },
          { id: 2, username: "james", password: "password2" },
          { id: 3, username: "natalie", password: "password3" },
        ],
      });
      //run 3 times
      const user = await findUserById(3);
      //we expect it to be called
      expect(findUserById).toHaveBeenCalled();
      //we have a total of 3 ids
      expect(user.data.length).toEqual(3);
      // we can find a user based on their id
      expect(user.data[2].id).toBe(3);
    });
  });
});

describe("locating a user based on their ID", () => {
  afterEach(() => jest.resetAllMocks());

  test("find all users based on their ID", async () => {
    const findUserById2 = jest.fn().mockResolvedValue({
      data: [
        //test more than 1 instance of username and password
        { id: 1, username: "rick", password: "password1" },
        { id: 2, username: "james", password: "password2" },
        { id: 3, username: "natalie", password: "password3" },
      ],
    });
    //run 3 times
    const user = await findUserById2(3);
    //we expect it to be called
    expect(findUserById2).toHaveBeenCalled();
    //we have a total of 3 ids
    expect(user.data.length).toEqual(3);
    // we can find a user based on their id
    expect(user.data[2].id).toBe(3);
  });
});

describe("located a user by their username", () => {
  afterEach(() => jest.resetAllMocks());
  test("find a user by their username", async () => {
    const getUser2 = jest.fn().mockResolvedValue({
      data: [
        //test more than 1 instance of username and password
        { id: 1, username: "rick", password: "password1" },
        { id: 2, username: "james", password: "password2" },
        { id: 3, username: "natalie", password: "password3" },
      ],
    });
    //getUser is called 3 times
    const findUser = await getUser2(3);
    //expect getUser to have been called
    expect(getUser2).toHaveBeenCalled();
    //findUser equals 3 total users
    expect(findUser.data.length).toEqual(3);
    //username finds the name that we expect
    expect(findUser.data[2].username).toEqual("natalie");
  });
});
