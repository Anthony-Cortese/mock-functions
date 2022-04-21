import { greeter } from "../src/spy";

describe("difference between mocks and spies", () => {
  test("mock testing", () => {
    //arrange

    const mock = jest.fn().mockReturnValue("Mocked Name");
    greeter.getFullName = mock;
    //act

    const result = greeter.greet("Tony", "Cortese");

    //assert
    expect(result).toBe("Hello! Mocked Name");
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalled(1);
  });

  test("spies testing", () => {
    //arrange
    //act
    //assert
  });
});
