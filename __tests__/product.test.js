import request from "supertest";
import makeApp from "../src/app";
import { jest } from "@jest/globals";

//keeps track of right call, the right number of times, the correct parameters
const createProduct = jest.fn();
const getProducts = jest.fn();
const updateProduct = jest.fn();

const app = makeApp({
  createProduct,
  getProducts,
  updateProduct,
});

describe("POST /products", () => {
  beforeEach(() => {
    //before each test we will reset the state
    createProduct.mockReset();
    //make a promise that the resolved value will begin at 0
    createProduct.mockResolvedValue(0);
  });

  describe("given a product and location", () => {
    test("should save the product and location and company to the database", async () => {
      const bodyData = [
        //test more than 1 instance of product company and location
        {
          product: "Sports Drink",
          company: "Body Armor",
          location: "Los Angeles",
        },
        { product: "Granola", company: "Cliff Bar", location: "Utah" },
        { product: "Jerky", company: "Tillamook", location: "Wisconsin" },
      ];
      for (const body of bodyData) {
        //reset back to original state
        createProduct.mockReset();
        await request(app).post("/products").send(body);
        //how many times the createUser function is called
        expect(createProduct.mock.calls.length).toBe(1);
        //correct product and location combination is passed in the correct order
        expect(createProduct.mock.calls[0][0]).toBe(body.product);
        expect(createProduct.mock.calls[0][1]).toBe(body.company);
        expect(createProduct.mock.calls[0][2]).toBe(body.location);
      }
    });

    test("should respond with a json object containg the product id", async () => {
      //loop to increment the ID# by 1
      for (let i = 0; i < 10; i++) {
        //mock reset
        createProduct.mockReset();
        //make a promise that the resolved value will be a new ID
        createProduct.mockResolvedValue(i);
        //post request to check what ID is sent to the database and what is sent to the client
        const response = await request(app).post("/products").send({
          product: "Energy Drink",
          company: "Monster",
          location: "California",
        });
        expect(response.body.productId).toBe(i);
      }
    });

    test("should update the product name based on user input", async () => {
      updateProduct.mockReset();
      //mock resolved value is a new type of product
      const updated = updateProduct.mockResolvedValue("Healthy Beverage");
      //this was the original product
      await request(app).post("/:id").send({
        product: "Energy Drink",
      });
      //this is expected to be the mocked value
      expect(updated).not.toBe("Energy Drink");
    });
  });
});
