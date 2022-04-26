import Knex from "knex";

jest.mock("knex");

describe("mocking knex for my database", () => {
  test("mocking my users database", () => {
    const querybuilder = {
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
      then: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      toNative: jest.fn(),
    };
    const mKnex = jest.fn().mockReturnValue(querybuilder);
    Knex.mockReturnValue(mKnex);
    const { main } = require("../db/index");
    main();
    expect(Knex).toBeCalledWith({ client: "pg" });
    expect(mKnex).toBeCalledWith("users");
    expect(querybuilder.where).toBeCalledWith({
      title: "username",
      lang: "eng",
    });
    expect(querybuilder.select).toBeCalledTimes(1);
    expect(querybuilder.from).toBeCalledTimes(1);
    expect(querybuilder.select).toBeCalledTimes(1);
    expect(querybuilder.first).toBeCalledTimes(1);
    expect(querybuilder.then).toBeCalledTimes(1);
    expect(querybuilder.orderBy).toBeCalledWith("date", "desc");
    expect(querybuilder.toNative).toBeCalledTimes(1);
  });
});
