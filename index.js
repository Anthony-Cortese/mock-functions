const server = require("./db/server");

server.get("/api", (req, res) => {
  res.status(200).json({
    message: "your server is up and running on Natalie PORTman 8080",
  });
});

const port = 8080;

server.listen(8080, () => console.log("listening on Natalie PORTman 8080"));
