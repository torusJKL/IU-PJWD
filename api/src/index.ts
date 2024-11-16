import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { SQLiteDal } from "./sqliteDal";
import { wineEntry, wineUpdate, wineDelete } from "./types";

// create the class to use SQLite
const db = new SQLiteDal();

const app = new Elysia()
  // enable CORS and allow the frontend on to access the API
  .use(cors({ origin:(["http://localhost:5173", "http://localhost:4173"]) }))

  // provide a UI to test the API in the browser under http://localhost:3000/swagger
  .use(swagger())

  // route to add new wine entries
  .post('/addWine', ({ body, error }) => {
    // use the class method to write to the DB
    const newWine = db.addWineToDb(body);

    // return a HTTP status code of 400 if there is an issue
    if (newWine.id == undefined){
      return error(400)
    }

		return newWine
	},
  // validate the mandatory fields of the received JSON
  { body: wineEntry })

  // route to retrieve all wines entries
  .get('/getWines', ({ query }) => {

    // make sure that no invalid sorting values are processed (SQL injection protection)
    const allowedSorting = ["id", "-id", "name", "-name", "year", "-year", "rating", "-rating"];
    if (false == allowedSorting.includes(query.sorting)){
      return []
    }

    // use the class method to rertieve all wine entries of the db
    const result = db.getWineFromDb(query.sorting);
    return result;
  },
  // validate the mandatory query parameter exists
  { query: t.Object({
      sorting: t.String()})
  })

  // route to update existing wine entires
  .put('/updateWine', ({ body, error }) => {
    // use the class method to write to the DB
    const status = db.updateWineInDb(body);

    // return a HTTP status code of 400 if there is an issue
    if (status.code != 0){
      return error(400, status)
    }

		return status
  },
  // validate the mandatory fields of the received JSON
  { body: wineUpdate })

  .delete('deleteWine', ({ body, error }) => {
    const status = db.deleteWineFromDb(body);

    // return a HTTP status code of 400 if there is an issue
    if (status.code != 0){
      return error(400, status)
    }

		return status
  },
  // validate the mandatory fields of the received JSON
  { body: wineDelete })

  // make the api available on port 3000
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
