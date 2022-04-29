const express = require("express");

const usersRouter = require("../src/users/router");
const productsRouter = require("../src/products/router");

const router = express.Router();

router.use(express.json());

router.use("/api/users", usersRouter);
router.use("/api/products", productsRouter);

module.exports = {
  router,
};
