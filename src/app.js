import express from "express";

export default function (database) {
  const app = express();

  app.use(express.json());

  app.post("/users", async (req, res) => {
    const { password, username } = req.body;
    if (!password || !username) {
      res.sendStatus(400);
      return;
    }
    const userId = await database.createUser(username, password);

    res.send({ userId });
  });

  app.post("/products", async (req, res) => {
    const { product, company, location } = req.body;
    if (!product || !location || !company) {
      res.sendStatus(400);
      return;
    }
    const productId = await database.createProduct(product, company, location);

    res.send({ productId });
  });

  // app.post("/ingredients", async (req, res) => {
  //   const { ,  ,  } = req.body;
  //   if (!product || !location || !company) {
  //     res.sendStatus(400);
  //     return;
  //   }
  //   const ingredientId = await database.createProduct(product, company, location);

  //   res.send({ productId });
  // });

  return app;
}
