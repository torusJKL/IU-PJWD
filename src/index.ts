import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { SQLiteDal } from "./sqliteDal";
import { wineEntry } from "./types";

// create the class to use SQLite
const db = new SQLiteDal();

const app = new Elysia()
  // provide a UI to test the API in the browser under http://localhost:3000/swagger
  .use(swagger())

  // route to add new wine entries
  .post('/add', ({ body, error }) => {
    // use the class method to write to the DB
    var status = db.addWineToDb(body);

    // return a HTTP status code of 400 if there is an issue
    if (status.code != 0){
      return error(400, status)
    }

		return status
	},
  // validate the mandatory fields of the received JSON
  { body: wineEntry })

  // make the api available on port 3000
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
