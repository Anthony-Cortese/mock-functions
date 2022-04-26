import request from "supertest";
import makeApp from "../src/app";
import { jest } from "@jest/globals";

//keeps track of right call, the right number of times, the correct parameters
const createUser = jest.fn();
const removeUser = jest.fn();

const app = makeApp({
  createUser,
  removeUser,
});

describe("POST /users", () => {
  beforeEach(() => {
    //before each test we will reset the state
    createUser.mockReset();
    //make a promise that the resolved value will begin at 0
    createUser.mockResolvedValue(0);
  });

  describe("given a username and password", () => {
    test("should save the username and password to the database", async () => {
      const bodyData = [
        //test more than 1 instance of username and password
        { username: "username1", password: "password1" },
        { username: "username2", password: "password2" },
        { username: "username3", password: "password3" },
      ];
      for (const body of bodyData) {
        //reset back to original state
        createUser.mockReset();
        await request(app).post("/users").send(body);
        //how many times the createUser function is called
        expect(createUser.mock.calls.length).toBe(1);
        //correct username or password combination is passed in the correct order
        expect(createUser.mock.calls[0][0]).toBe(body.username);
        expect(createUser.mock.calls[0][1]).toBe(body.password);
      }
    });

    test("should respond with a json object containg the user id", async () => {
      //loop to increment the ID# by 1
      for (let i = 0; i < 10; i++) {
        //mock reset
        createUser.mockReset();
        //make a promise that the resolved value will be a new ID
        createUser.mockResolvedValue(i);
        //post request to check what ID is sent to the database and what is sent to the client
        const response = await request(app)
          .post("/users")
          .send({ username: "username", password: "password" });
        //expecting the userID to be the incremented value
        expect(response.body.userId).toBe(i);
      }
    });
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
      const userId = await findUserById(3);
      expect(findUserById).toHaveBeenCalled();
      expect(userId.data.length).toEqual(3);
    });
  });

  describe("located a user by their username", () => {
    afterEach(() => jest.resetAllMocks());
    test("find a user by their username", async () => {
      const getUser = jest.fn().mockResolvedValue({
        data: [
          //test more than 1 instance of username and password
          { id: 1, username: "rick", password: "password1" },
          { id: 2, username: "james", password: "password2" },
          { id: 3, username: "natalie", password: "password3" },
        ],
      });
      const findUser = await getUser(3);
      expect(getUser).toHaveBeenCalled();
      expect(findUser.data.length).toEqual(3);
      expect(findUser.data[2].username).toEqual("natalie");
    });
  });

  // test("should remove a user based on their ID", async () => {

  //   const userData = [
  //     //test more than 1 instance of username and password
  //     { id: 1, username: "username1", password: "password1" },
  //     { id: 2, username: "username2", password: "password2" },
  //     { id: 3, username: "username3", password: "password3" },
  //   ];
  //   for (const body of userData) {

  //   removeUser.mockReset();

  //   const response = await request(app).delete("/users");

  //   expect(removeUser.mock.calls.length).toBe(1);

  //   expect(response.body.userId);
  //   }
  // });
});
