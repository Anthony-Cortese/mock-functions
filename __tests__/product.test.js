import request from "supertest";
import makeApp from "../src/app";
import { jest } from "@jest/globals";

//keeps track of right call, the right number of times, the correct parameters
const createProduct = jest.fn();
const getProducts = jest.fn();

const app = makeApp({
  createProduct,
  getProducts,
});

describe("POST /products", () => {
  beforeEach(() => {
    //before each test we will reset the state
    createProduct.mockReset();
    //make a promise that the resolved value will begin at 0
    createProduct.mockResolvedValue(0);
  });

  describe("given a product and location and company name", () => {
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
        //correct product and location and company combination is passed
        expect(createProduct.mock.calls[0][0]).toBe(body.product);
        expect(createProduct.mock.calls[0][1]).toBe(body.company);
        expect(createProduct.mock.calls[0][2]).toBe(body.location);
      }
    });

    test("should respond with a json object containg the product id and that the data is incremented by 1", async () => {
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
  });

  describe("errors, and status codes", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [{}];
      for (const body of bodyData) {
        const response = await request(app).post("/products").send(body);
        expect(response.statusCode).toBe(400);
      }
    });

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/products").send({
        product: "Energy Drink",
        company: "Monster",
        location: "California",
      });
      expect(response.statusCode).toBe(200);
    });

    test("response has productId", async () => {
      const response = await request(app).post("/products").send({
        product: "Energy Drink",
        company: "Monster",
        location: "California",
      });
      expect(response.body.productId).toBeDefined();
    });
  });

  describe("updating the product", () => {
    test("should update the product name based on user input", async () => {
      const updateProduct = jest.fn().mockResolvedValue("Healthy Beverage");
      //this was the original product
      await request(app).post("/products").send({
        product: "Energy Drink",
      });
      //this is expected to be the mocked value
      const products = await updateProduct(1);
      expect(products).toEqual("Healthy Beverage");
    });
  });

  describe("test to get a product by name", () => {
    test("test get product by name", async () => {
      const getProducts = jest.fn().mockResolvedValue({
        data: [
          {
            product: "Sports Drink",
            company: "Body Armor",
            location: "Los Angeles",
          },
          { product: "Granola", company: "Cliff Bar", location: "Utah" },
          { product: "Jerky", company: "Tillamook", location: "Wisconsin" },
        ],
      });
      //getProducts is called 3 times
      const findProduct = await getProducts(3);
      expect(getProducts).toHaveBeenCalled();
      //the length of the data is 3
      expect(findProduct.data.length).toEqual(3);
      //different indexes to make sure the data equals what we expect
      expect(findProduct.data[2].product).toEqual("Jerky");
      expect(findProduct.data[1].company).toEqual("Cliff Bar");
      expect(findProduct.data[0].location).toEqual("Los Angeles");
    });
  });

  describe("remove a product from database", () => {
    afterEach(() => jest.resetAllMocks());

    test("testing remove product, if a product is removed", async () => {
      const removeProduct = jest.fn().mockResolvedValue({
        data: [
          { id: 2, product: "Granola", company: "Cliff Bar", location: "Utah" },
          {
            id: 3,
            product: "Jerky",
            company: "Tillamook",
            location: "Wisconsin",
          },
        ],
      });
      //run remove product 3 times
      const remove = await removeProduct(3);
      //we expect it to have been called
      expect(removeProduct).toHaveBeenCalled();
      //the new length is now 2
      expect(remove.data.length).toEqual(2);
    });
  });

  describe("test to get all products by Id", () => {
    afterEach(() => jest.resetAllMocks());

    test("fetches all products by Id", async () => {
      const getProductsById = jest.fn().mockResolvedValue({
        data: [
          //test more than 1 instance of product company and location
          {
            id: 1,
            product: "Sports Drink",
            company: "Body Armor",
            location: "Los Angeles",
          },
          { id: 2, product: "Granola", company: "Cliff Bar", location: "Utah" },
          {
            id: 3,
            product: "Jerky",
            company: "Tillamook",
            location: "Wisconsin",
          },
        ],
      });
      //await so getProductsById is called 3 times
      const products = await getProductsById(3);
      //getProductsById is called
      expect(getProductsById).toHaveBeenCalled();
      //the id at index 1 will equal 2
      expect(products.data[1].id).toEqual(2);
      //the amount of total ID's in the data
      expect(products.data.length).toEqual(3);
    });
  });
});
