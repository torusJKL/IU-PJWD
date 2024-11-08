import { Database } from "bun:sqlite";
import { apiResponse, IDal, wineEntry } from "./types";

// class that handles reading and writting to the SQLite database
export class SQLiteDal implements IDal {

    // create a SQLite database
    db: Database = new Database("winedb.sqlite", { create: true });
    
    constructor(){
        // create the wine table
        // the combination of name and year must be unique.
        const db = new Database("winedb.sqlite", { create: true });
        db.run("CREATE TABLE IF NOT EXISTS wines " + 
                "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, year INTEGER, rating INTEGER," +
                "UNIQUE (name, year))");
    }

    // function that adds the wine entry to the db and returns a status code
    addWineToDb(entry: wineEntry) : apiResponse {

        // create the insert query
        const query = this.db.query(`INSERT INTO wines (name, year, rating)` +
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
            return { code: -1, message: "Failed to add the entry to the db." } ;
        }
    }
}
