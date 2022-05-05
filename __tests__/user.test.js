//@ts-check
import request from "supertest";
import makeApp from "../src/app.js";
import { jest } from "@jest/globals";
import chai from "chai";
import sinon from "sinon";

const expect = chai.expect;

jest.mock("../db/db-config.js");

//keeps track of right call, the right number of times, the correct parameters
const createUser = jest.fn();

const app = makeApp({
  createUser,
});

describe("creating a new user", () => {
  afterEach(() => jest.resetAllMocks());

  describe("given a username and password", () => {
    beforeEach(() => {
      //before each test we will reset the state
      createUser.mockReset();
      //make a promise that the resolved value will begin at 0
      createUser.mockResolvedValue(0);
    });

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
        expect(createUser.mock.calls).to.have.lengthOf(1);
        //correct username or password combination is passed in the correct order
        expect(createUser.mock.calls[0][0]).to.equal(body.username);
        expect(createUser.mock.calls[0][1]).to.equal(body.password);
      }
    });

    test("should respond with a json object containg the user id and that the id is incremented by 1", async () => {
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
        expect(response.body.userId).to.equal(i);
      }
    });
  });

  describe("user ID", () => {
    afterEach(() => jest.resetAllMocks());

    test("it should locate a user by id", async () => {
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
      //we have a total of 3 ids
      expect(user.data.length).to.equal(3);
      // we can find a user based on their id
      expect(user.data[1].id).to.equal(2);
    });
  });
  describe("remove a user from database", () => {
    afterEach(() => jest.resetAllMocks());

    test("testing remove user, if a user is removed", async () => {
      const removeUser = jest.fn().mockResolvedValue({
        data: [
          //test more than 1 instance of username and password
          { id: 1, username: "rick", password: "password1" },
          { id: 3, username: "natalie", password: "password3" },
        ],
      });
      //we expect remove user to be called 3 times
      const remove = await removeUser(3);
      //the length is now 2 users
      expect(remove.data).to.have.lengthOf(2);
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
      //getUser is called 3 times
      const findUser = await getUser(3);
      //findUser equals 3 total users
      expect(findUser.data.length).to.equal(3);
      //username finds the name that we expect
      expect(findUser.data[2].username).to.equal("natalie");
    });
  });

  test("should respond with a 200 status code", async () => {
    const response = await request(app).post("/users").send({
      username: "username",
      password: "password",
    });
    expect(response.statusCode).to.equal(200);
  });

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [{ username: "username" }, { password: "password" }, {}];
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body);
        //status code is 400 because username and password are both missing
        expect(response.statusCode).to.equal(400);
      }
    });
  });
});
