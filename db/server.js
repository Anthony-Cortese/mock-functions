const express = require("express");

const usersRouter = require("../src/users/router");
const productsRouter = require("../src/products/router");

const server = express();

server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/products", productsRouter);

module.exports = server;
