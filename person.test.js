const person = require("../person");

jest.mock("../person");

test("uses the mock person", () => {
  expect(person.name).toBe("Mock Person");
});
