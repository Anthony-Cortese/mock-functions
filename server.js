const database = require("./src/db/database");
import makeApp from "./src/app";

const app = makeApp(database);

app.listen(8080, () => console.log("listening on port 8080"));
