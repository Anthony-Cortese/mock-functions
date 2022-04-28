const router = require("express");

const usersPost = (database) => {
  const router = express();

  router.use(express.json());

  router.post("/users", async (req, res) => {
    const { password, username } = req.body;
    if (!password || !username) {
      res.sendStatus(400);
      return;
    }
    const userId = await database.createUser(username, password);

    res.send({ userId });
  });
  return usersPost;
};

module.exports = router;
