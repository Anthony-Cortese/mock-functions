const express = require("express");

const usersRouter = require("../src/users/router");

const server = express();

server.use(express.json());

server.use("/api/users", usersRouter);

module.exports = server;
