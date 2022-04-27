import { getUsers } from "../db/knexfile";
import { Client } from "pg";
import { success, failure } from "../db/hander";

jest.mock("pg", () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

jest.mock("../db/hander", () => {
  return {
    success: jest.fn(),
    failure: jest.fn(),
  };
});

describe("database setup", () => {
  let client;
  beforeEach(() => {
    client = new Client();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should success official database setup", async () => {
    client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
    await getUsers();
    expect(client.connect).toBeCalledTimes(1);
    expect(client.query).toBeCalledWith("SELECT * FROM public.users;");
    expect(client.end).toBeCalledTimes(1);
    expect(success).toBeCalledWith({
      message: "0 item(s) returned",
      data: [],
      status: true,
    });
  });

  it("should failure on official database setup", async () => {
    const mError = new Error("dead lock");
    client.query.mockRejectedValueOnce(mError);
    await getUsers();
    expect(client.connect).toBeCalledTimes(1);
    expect(client.query).toBeCalledWith("SELECT * FROM public.users;");
    expect(client.end).toBeCalledTimes(1);
    expect(failure).toBeCalledWith({ message: mError, status: false });
  });
});
