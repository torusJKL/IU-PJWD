import { t } from "elysia";

// the Elysia schema used to validate the recieved JSON
export const wineEntry = t.Object({
    id: t.Optional(t.Number()),
    name: t.String(),
    year: t.Number(),
    rating: t.Number()
  })
  
// the type of a wine entry
export type wineEntry = typeof wineEntry.static;
  
// the type of the API reponse
export type apiResponse = {
code: number,
message: string,
}

// the interface for the database class
export interface IDal {
    addWineToDb(entry: wineEntry): apiResponse;
}