import { Database } from "bun:sqlite";
import { IDal, wineEntry, wineDelete, wineUpdate, wineStatus } from "./types";

// class that handles reading and writting to the SQLite database
export class SQLiteDal implements IDal {

    // create a SQLite database
    db: Database = new Database("winedb.sqlite", { create: true });
    
    constructor(){
        // create the wine table
        // the combination of name and year must be unique.
        const db = new Database("winedb.sqlite", { create: true });
        db.run("CREATE TABLE IF NOT EXISTS wines " + 
                "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, year INTEGER, rating INTEGER, " +
                "UNIQUE (name, year))");
    }

    // method that adds the wine entry to the db and returns a status code
    addWineToDb(entry: wineEntry): wineStatus {

        // create the insert query with placeholders to defend against SQL injection
        const query = this.db.query(`INSERT INTO wines (name, year, rating) ` +
                                    `VALUES (?, ?, ?)`);

        try {
            // run the insert query and desrtuct the returned last row id
            const { lastInsertRowid } = query.run(entry.name, entry.year, entry.rating);

            // return the newly created entry with the last id
            const response: wineStatus = {
                                apiResponse:
                                    { code: 200 },
                                wine:
                                { ...entry, id: Number(lastInsertRowid) }}
            return response;
        }
        catch (error) {
            console.error(`Failed to add to db: ${error}`);

            // return the wine without a db id
            const response: wineStatus = {
                                apiResponse:
                                    { code: 400, message: `${error}` }};
            return response;
        }
    }

    // method that retrieves all wine entries from the db
    getWineFromDb(sorting: string): wineEntry[] {

        // define sort order based on if the first char is a "-" sign
        const sortOrder = sorting.charAt(0) == "-" ? "desc" : "asc";

        // remove the "-" sign if it is part of the column name
        const sortColumn = sorting.charAt(0) == "-" ? sorting.substring(1) : sorting;

        // create the order SQL string
        const dbOrderBy = `ORDER BY ${sortColumn} ${sortOrder}`;

        // create the select all wine entries including the order string
        const query = this.db.query(`SELECT * FROM wines ${dbOrderBy}`);

        try {
            // run the query and cast it to a wineEntry array
            const result = query.all() as wineEntry[];

            return result;
        }
        catch (error) {
            console.error(`Failed to retrieve the wine entries from db: ${error}`);

            // return an empty array instead of failing
            return [];
        }
    }

    // method to update existing wine entry
    updateWineInDb(entry: wineUpdate): wineStatus {

        // create the update query with placeholders to defend against SQL injection
        const query = this.db.query(`UPDATE wines ` +
                                    `SET name = ?, year = ?, rating = ? ` +
                                    `WHERE id = ?`);

        try {
            // run the update query
            query.run(entry.name, entry.year, entry.rating, entry.id);

            // statusCode 0 means everything went well
            const result: wineStatus = { apiResponse: { code: 200 }};
            return result;
        }
        catch (error) {
            console.error(`Failed to update db: ${error}`);

            // any statusCode other than 0 means that there is an issue
            const result: wineStatus = { apiResponse: { code: 400, message: `${error}` }};
            return result;
        }
    }

    // method to delete a wine entry
    deleteWineFromDb(entry: wineDelete): wineStatus {

        // create the delete query with placeholders to defend against SQL injection
        const query = this.db.query(`DELETE FROM wines ` +
                                    `WHERE id = ?`);

        try {
            // run the delete query
            query.run(entry.id);

            // statusCode 0 means everything went well
            const result: wineStatus = { apiResponse: { code: 200 }};
            return result;
        }
        catch (error) {
            console.error(`Failed to delete from db: ${error}`);

            // any statusCode other than 0 means that there is an issue
            const result: wineStatus = { apiResponse: { code: 400, message: `${error}` }};
            return result;
        }
    }
}
