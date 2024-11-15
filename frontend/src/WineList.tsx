
import { useEffect, useState } from "react";
import { wineEntry } from "./types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const WineList = ( { rating }: { rating: string }) => {
    // keep the wine list in this app state
    const [wines, setWines] = useState<wineEntry[]>([]);

    // sort order app state (0: no order, 1: ascending, 2: descending)
    const [sortOrder, setSortOrder] = useState<Number>(0);

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
                        {/* use 5 stars to display rating */}
                        <div className="flex items-center">
                            {/* change css for star color fill based on wine rating */}
                            <svg className={"w-4 h-4 ms-1" + (wine.rating >= 1 ? " text-yellow-300" : " text-gray-300")} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg className={"w-4 h-4 ms-1" + (wine.rating >= 2 ? " text-yellow-300" : " text-gray-300")} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg className={"w-4 h-4 ms-1" + (wine.rating >= 3 ? " text-yellow-300" : " text-gray-300")} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg className={"w-4 h-4 ms-1" + (wine.rating >= 4 ? " text-yellow-300" : " text-gray-300")} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg className={"w-4 h-4 ms-1" + (wine.rating >= 5 ? " text-yellow-300" : " text-gray-300")} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
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
