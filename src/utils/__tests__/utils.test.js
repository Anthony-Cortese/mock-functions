//This is useful when you want to create a manual mock that extends the automatic mock's behavior.
const utils = jest.createMockFromModule("../utils").default;
utils.isAuthorized = jest.fn((secret) => secret === "not predator");

test("implementation created by jest.utils", () => {
  //using the module, create a manual mock that extends the mocked version module for you
  expect(utils.authorize.mock).toBeTruthy();
  //set a secret, test over the secret to find if they are equal
  expect(utils.isAuthorized("not predator")).toEqual(true);
});
