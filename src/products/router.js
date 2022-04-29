const router = require("express");

router.post("/products", async (req, res) => {
  const { product, company, location } = req.body;
  if (!product || !location || !company) {
    res.sendStatus(400);
    return;
  }
  const productId = await database.createProduct(product, company, location);

  res.send({ productId });
});

module.exports = {
  router,
};
