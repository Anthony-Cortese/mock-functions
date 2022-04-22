const person = require("../person");
//person module is mocked so we can used the mocked data rather than the actual data
jest.mock("../person");

test("uses the mock person", () => {
  expect(person.name).toBe("Mock Person");
});
