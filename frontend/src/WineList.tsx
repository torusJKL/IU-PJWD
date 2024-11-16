
import { useEffect, useState } from "react";
import { wineEntry } from "./types";
import axios from "axios";
import TitleColumn from "./TitleColumn";
import WineInput from "./WineInput";
import WineActions from "./WineActions";
import WineFields from "./WineFields";

const WineList = ( { rating }: { rating: string }) => {
    // keep the wine list in this app state
    const [wines, setWines] = useState<wineEntry[]>([]);

    // sorting of columns. (e.g. year for ascending or -year for descending)
    const [sorting, setSorting] = useState<string>("id");

    // store ids of entries that the user is editing
    const [winesInEditMode, setWinesInEditMode] = useState<number[]>([]);

    // app state to store the input values before sending to the API
    const [newWine, setNewWine] = useState<wineEntry>({
        id: 0,
        name: "",
        year: new Date().getFullYear(),
        rating: 1,
    });

    // will be called after pages' first render or rating or sortOrder is updated
    useEffect(() => {
        axios
            // get all wines from API
            .get<wineEntry[]>(`http://localhost:3000/getWines?sorting=${sorting}`)

            // once promise is fullfilled
            .then(res => {
                // assign data to local variable so that we can manipulate it easier
                let wines = res.data;

                // check if the user has chosen a rating filter
                if (rating != ""){
                    // create a subset with all wines that have the selected rating
                    wines = wines.filter(w => w.rating == Number.parseInt(rating));
                }

                // store all wines to the app state
                setWines(wines);
            })

            // print errors to console if there is an issue
            .catch(err => console.log(err));
    }, [rating, sorting]);

    return (
        <div className="flex flex-col gap-2 p-7 h-[500px] w-full justify-start items-center">
            <WineInput
                newWine={newWine}
                onAddingWine={ (wine) => setWines([wine, ...wines]) }
                onWineChange={ (newWine) => setNewWine(newWine) }
            />
            <div className="max-h-auto xs:min-h-12 w-5/6 bg-orange-300 rounded">
                <div className="flex flex-col xs:flex-row min-h-full items-center my-1 xs:mt-0">
                    <TitleColumn columnName="name" sorting={sorting} onSelectSorting={(sort) => setSorting(sort)} />
                    <TitleColumn columnName="year" sorting={sorting} onSelectSorting={(sort) => setSorting(sort)} />
                    <TitleColumn columnName="rating" sorting={sorting} onSelectSorting={(sort) => setSorting(sort)} />
                    <div className="flex justify-center w-1/4"></div>
                </div>
            </div>
            {wines.map(wine =>
            <div className="max-h-auto min-h-40 xs:min-h-12 w-5/6 bg-slate-400 rounded" key={wine.id}>
                <div className="flex flex-col justify-around xs:flex-row min-h-36 xs:min-h-12 items-center my-2 xs:my-0">
                    <WineFields
                        wine={wine}
                        wines={wines}
                        winesInEditMode={winesInEditMode}
                        onWineChange={ (wines) => setWines(wines) }
                    />
                    <div className="flex justify-center w-1/4" key={wine.id}>
                        <WineActions
                            wines={wines}
                            wine={wine}
                            winesInEditMode={winesInEditMode}
                            onWineAction={ (wines) => setWines(wines) }
                            onEditModeChange={ (winesInEditMode) => setWinesInEditMode(winesInEditMode) }
                        />
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

// make the component available to other files
export default WineList;
