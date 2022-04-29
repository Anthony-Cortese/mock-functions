const router = require("express").Router();

router.post("/users", async (req, res) => {
  const { password, username } = req.body;
  if (!password || !username) {
    res.sendStatus(400);
    return;
  }
  const userId = await database.createUser(username, password);

  res.send({ userId });
});

module.exports = {
  router,
};
