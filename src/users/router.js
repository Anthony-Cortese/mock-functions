const router = require("express").Router();
const Users = require("./model");

router.get("/", (req, res, next) => {
  Users.getUser()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.post("/", async (req, res) => {
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
