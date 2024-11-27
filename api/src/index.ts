import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { SQLiteDal } from "./sqliteDal";
import { wineEntry, wineUpdate, wineDelete, apiResponse } from "./types";

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
    const result = db.addWineToDb(body);

    // return a HTTP status code of 400 if there is an issue
    if (result.apiResponse.code != 200){
      return error(result.apiResponse.code, result.apiResponse.message);
    }

		return result;
	},
  // validate the mandatory fields of the received JSON
  { body: wineEntry })

  // route to retrieve all wines entries
  .get('/getWines', ({ query }) => {

    // make sure that no invalid sorting values are processed (SQL injection protection)
    const allowedSorting = ["id", "-id", "name", "-name", "year", "-year", "rating", "-rating"];
    if (false == allowedSorting.includes(query.sorting)){
      return [];
    }

    // use the class method to rertieve all wine entries of the db
    const result = db.getWineFromDb(query.sorting);
    return result;
  },
  // validate the mandatory query parameter exists
  { query: t.Object({
      sorting: t.String()}),
  })

  // route to update existing wine entires
  .put('/updateWine', ({ body, error }) => {
    // use the class method to write to the DB
    const result = db.updateWineInDb(body);

    // return a HTTP status code of 400 if there is an issue
    if (result.apiResponse.code != 200){
      return error(result.apiResponse.code, result.apiResponse.message);
    }

		return result;
  },
  // validate the mandatory fields of the received JSON
  { body: wineUpdate })

  .delete('deleteWine', ({ body, error }) => {
    const result = db.deleteWineFromDb(body);

    // return a HTTP status code of 400 if there is an issue
    if (result.apiResponse.code != 200){
      return error(result.apiResponse.code, result.apiResponse.message);
    }

		return result;
  },
  // validate the mandatory fields of the received JSON
  { body: wineDelete })

  // route to add random wine entries to the db
  .get('/createRandomEntries/:count', ({ params: { count } }) => {
    // return the created wines
    return db.createRandomEntries(Number.parseInt(count));
  })

  // make the api available on port 3000
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
