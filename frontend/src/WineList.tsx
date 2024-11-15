
import { useEffect, useState } from "react";
import { wineEntry } from "./types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import RatingStarts from "./RatingStars";

const WineList = ( { rating }: { rating: string }) => {
    // keep the wine list in this app state
    const [wines, setWines] = useState<wineEntry[]>([]);

    // sort order app state (0: no order, 1: ascending, 2: descending)
    const [sortOrder, setSortOrder] = useState<number>(0);

    // will be called after pages' first render or rating or sortOrder is updated
    useEffect(() => {
        axios
            // get all wines from API
            .get<wineEntry[]>("http://localhost:3000/getWines")

            // once promise is fullfilled
            .then(res => {
                // assign data to local variable so that we can manipulate it easier
                let wines = res.data;

                // sort the wines by year ascending
                if (sortOrder == 1){
                    wines = wines.sort((a, b) => {return a.year - b.year})
                }

                // sort the wines by year descending
                if (sortOrder == 2){
                    wines = wines.sort((a, b) => {return b.year - a.year})
                }

                // check if the user has chosen a rating filter
                if (rating != ""){
                    // create a subset with all wines that have the selected rating
                    wines = wines.filter(w => w.rating == Number.parseInt(rating));
                }

                // store all wines to the app state
                setWines(res.data);
            })

            // print errors to console if there is an issue
            .catch(err => console.log(err));
    }, [rating, sortOrder]);

    const getSortOrderColor = (sortIcon: string): string => {
        if (sortOrder == 1 && sortIcon == "asc"){
            return "text-red-600";
        }
            
        if (sortOrder == 2 && sortIcon == "desc"){
            return "text-red-600";
        }

        return "text-black-600";
    }

    return (
        <div className="flex flex-col gap-2 p-7 h-[500px] w-full justify-start items-center">
            <div className="h-14 w-5/6 bg-orange-300 rounded">
                <div className="flex min-h-full items-center">
                    <div className="flex justify-center w-1/4">Name</div>
                    <div className="flex justify-center w-1/4">Year
                        <div className={ (getSortOrderColor("asc")) } style={{ cursor: 'pointer' }} role="button"
                             onClick={ () => { sortOrder == 1 ? setSortOrder(0) : setSortOrder(1) }}>
                            <FontAwesomeIcon icon={faCaretUp} />
                        </div>
                        <div className={ (getSortOrderColor("desc")) } style={{ cursor: 'pointer' }} role="button"
                             onClick={ () => { sortOrder == 2 ? setSortOrder(0) : setSortOrder(2) }}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                    <div className="flex justify-center w-1/4">Rating</div>
                    <div className="flex justify-center w-1/4">edit/delete</div>
                </div>
            </div>
            {wines.map(wine =>
            <div className="h-14 w-5/6 bg-slate-400 rounded" key={wine.id}>
                <div className="flex min-h-full items-center">
                    <div className="flex justify-center w-1/4">{wine.name}</div>
                    <div className="flex justify-center w-1/4">{wine.year}</div>
                    <div className="flex justify-center w-1/4">
                        <RatingStarts rating={wine.rating} />
                    </div>
                    <div className="flex justify-center w-1/4" key={wine.id}></div>
                </div>
            </div>
            )}
        </div>
    )
}

// make the component available to other files
export default WineList;
