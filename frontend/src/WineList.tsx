
import { useEffect, useState } from "react";
import { wineEntry } from "./types";
import axios from "axios";
import RatingStars from "./RatingStars";
import TitleColumn from "./TitleColumn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import WineInput from "./WineInput";

const WineList = ( { rating }: { rating: string }) => {
    // keep the wine list in this app state
    const [wines, setWines] = useState<wineEntry[]>([]);

    // sorting of columns. (e.g. year for ascending or -year for descending)
    const [sorting, setSorting] = useState<string>("id");

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

    const deleteWine = (wine: wineEntry): void => {
        // store the current state of wines in case we need to rollback the delete
        const originalWines = [...wines];

        // remove the wine from the state to immediatelly update the UI
        setWines(wines.filter(w => w.id != wine.id));

        axios
            // delete the selected wine from the DB
            .delete(`http://localhost:3000/deleteWine`, { data: { id: wine.id } })

            // in case there is an issue print the error to the console
            // and return the wines state to the original state
            .catch((err) => {
                console.log(err);
                setWines(originalWines)
            });
    };

    return (
        <div className="flex flex-col gap-2 p-7 h-[500px] w-full justify-start items-center">
            <WineInput onAddingWine={ (wine) => setWines([...wines, wine]) } />
            <div className="h-14 w-5/6 bg-orange-300 rounded">
                <div className="flex min-h-full items-center">
                    <TitleColumn columnName="name" sorting={sorting} onSelectSorting={(sort) => setSorting(sort)} />
                    <TitleColumn columnName="year" sorting={sorting} onSelectSorting={(sort) => setSorting(sort)} />
                    <TitleColumn columnName="rating" sorting={sorting} onSelectSorting={(sort) => setSorting(sort)} />
                    <div className="flex justify-center w-1/4">edit/delete</div>
                </div>
            </div>
            {wines.map(wine =>
            <div className="h-14 w-5/6 bg-slate-400 rounded" key={wine.id}>
                <div className="flex min-h-full items-center">
                    <div className="flex justify-center w-1/4">{wine.name}</div>
                    <div className="flex justify-center w-1/4">{wine.year}</div>
                    <div className="flex justify-center w-1/4">
                        <RatingStars rating={wine.rating} />
                    </div>
                    <div className="flex justify-center w-1/4" key={wine.id}>
                        <div className="px-2"
                             onClick={ () => { deleteWine(wine) }}>
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

// make the component available to other files
export default WineList;
