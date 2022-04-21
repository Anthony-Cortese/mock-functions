import request from "supertest";
import makeApp from "../src/app";
import { jest } from "@jest/globals";

//keeps track of right call, the right number of times, the correct parameters
const createUser = jest.fn();
const getUser = jest.fn();

const app = makeApp({
  createUser,
  getUser,
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

    test("should respond with a 200 status code if data is inserted", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });

    test("response has userId", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.body.userId).toBeDefined();
    });
  });

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [{ username: "username" }, { password: "password" }, {}];
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
