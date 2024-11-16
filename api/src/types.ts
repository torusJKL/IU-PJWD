import { t } from "elysia";

// the Elysia schema to validate the JSON for new wine entries
export const wineEntry = t.Object({
  id: t.Optional(t.Number()),
  name: t.String(),
  year: t.Number(),
  rating: t.Number(),
})

// the Elysia schema to validate the JSON for deleting a wine entry
export const wineDelete = t.Object({
  id: t.Number(),
})

// the Elysia schema to validate the JSON for updating a wine entry
export const wineUpdate = t.Object({
  id: t.Number(),
  name: t.String(),
  year: t.Number(),
  rating: t.Number(),
})
  
// the type of a wine entry
export type wineEntry = typeof wineEntry.static;
export type wineDelete = typeof wineDelete.static;
export type wineUpdate = typeof wineUpdate.static;
  
// the type of the API reponse
export type apiResponse = {
code: number,
message: string,
}

// the interface for the database class
export interface IDal {
    addWineToDb(entry: wineEntry): wineEntry;
    getWineFromDb(sorting: string): wineEntry[];
    updateWineInDb(entry: wineUpdate): apiResponse;
    deleteWineFromDb(entry: wineDelete): apiResponse;
}