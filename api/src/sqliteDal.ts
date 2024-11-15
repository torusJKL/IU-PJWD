import { Database } from "bun:sqlite";
import { apiResponse, IDal, wineEntry, wineDelete, wineUpdate } from "./types";

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
    addWineToDb(entry: wineEntry): apiResponse {

        // create the insert query
        const query = this.db.query(`INSERT INTO wines (name, year, rating) ` +
                                    `VALUES ('${entry.name}', ${entry.year}, ${entry.rating})`);

        try {
            // run the insert query
            query.run();

            // statusCode 0 means everything went well
            return { code: 0, message: "Success!" } ;
        }
        catch (error) {
            console.log(`Failed to add to db: ${error}`);

            // any statusCode other than 0 means that there is an issue
            return { code: -1, message: "Failed to add the wine entry to the db." } ;
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
        } catch (error) {
            console.log(`Failed to retrieve the wine entries from db: ${error}`);

            // return an empty array instead of failing
            return [];
        }
    }

    // method to update existing wine entry
    updateWineInDb(entry: wineUpdate): apiResponse {

        // create the update query
        const query = this.db.query(`UPDATE wines ` +
                                    `SET name = '${entry.name}', year = ${entry.year}, rating = ${entry.rating} ` +
                                    `WHERE id = ${entry.id}`);

        try {
            // run the update query
            query.run();

            // statusCode 0 means everything went well
            return { code: 0, message: "Success!" } ;
        }
        catch (error) {
            console.log(`Failed to update db: ${error}`);

            // any statusCode other than 0 means that there is an issue
            return { code: -1, message: "Failed to update the wine entry in the db." } ;
        }
    }

    // method to delete a wine entry
    deleteWineFromDb(entry: wineDelete): apiResponse {

        // create the delete query
        const query = this.db.query(`DELETE FROM wines ` +
                                    `WHERE id = ${entry.id}`);

        try {
            // run the delete query
            query.run();

            // statusCode 0 means everything went well
            return { code: 0, message: "Success!" } ;
        }
            catch (error) {
            console.log(`Failed to delete from db: ${error}`);

            // any statusCode other than 0 means that there is an issue
            return { code: -1, message: "Failed to delete the wine entry from the db." } ;
        }
    }
}
