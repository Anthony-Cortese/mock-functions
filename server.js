import database from "../src/database.js";
import makeApp from "../src/app.js";

const app = makeApp(database);

app.listen(8080, () => console.log("listening on port 8080"));
