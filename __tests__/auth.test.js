import { getHashedPasswordFromDB } from "../src/auth/hashed";
const { authenticateUser } = require("../src/auth/auth");
import chai from "chai";

const expect = chai.expect;

jest.mock("../src/auth/hashed");

describe("login.js", () => {
  describe("#authenticateUser", () => {
    describe("if an error occurs", () => {
      it("should return a promise that rejects with the error", () => {
        const expectedError = new Error("Something broke");
        getHashedPasswordFromDB.mockImplementationOnce(() =>
          Promise.reject(expectedError)
        );

        return authenticateUser().catch((error) => {
          expect(error).to.equal(expectedError);
        });
      });
    });
  });
});
