const pg = require("pg");
const express = require("express");
const app = express();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
};

const pool = new pg.Pool(config);

app.get("/products", (req, res, next) => {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query("SELECT * FROM products", function (err, result) {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});

app.get("/products/1", (req, res, next) => {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query(
      "SELECT * FROM products WHERE id=1 LIMIT 3",
      function (err, result) {
        done();
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      }
    );
  });
});

app.get("/users", (req, res, next) => {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query("SELECT * FROM users", function (err, result) {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});

app.get("/users/1", (req, res, next) => {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query(
      "SELECT * FROM users WHERE id=1 LIMIT 3",
      function (err, result) {
        done();
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      }
    );
  });
});

app.listen(8080, function () {
  console.log("Server is running on Natalie PORTman 8080");
});
