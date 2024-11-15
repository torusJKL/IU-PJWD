
import { useEffect, useState } from "react";
import { wineEntry } from "./types";
import axios from "axios";

export const WineList = ( { rating }: { rating: string }) => {
    const [wines, setWines] = useState<wineEntry[]>([]);

    // useEffect will be called after the page has been rendered and every time rating is updated
    useEffect(() => {
        axios
            // get all wines from API
            .get<wineEntry[]>("http://localhost:3000/getWines")
            // store response data in the wines state
            .then(res => {
                // check if the user has chosen a rating filter
                if (rating != ""){
                    // create a subset with all wines that have the selected rating
                    let filteredWines = res.data.filter(w => w.rating == Number.parseInt(rating));
                    // store the subset to the app state
                    setWines(filteredWines)
                }
                else {
                    // store all wines to the app state
                    setWines(res.data);
                }
            })
            // print errors to console
            .catch(err => console.log(err));
    }, [rating]);

    return (
        <div className="flex flex-col gap-2 p-7 h-[500px] w-full justify-start items-center">
            <div className="h-14 w-5/6 bg-orange-300 rounded">
                <div className="flex min-h-full items-center">
                    <div className="flex justify-center w-1/4">Name</div>
                    <div className="flex justify-center w-1/4">Year</div>
                    <div className="flex justify-center w-1/4">Rating</div>
                    <div className="flex justify-center w-1/4">edit/delete</div>
                </div>
            </div>
            {wines.map(wine =>
            <div className="h-14 w-5/6 bg-slate-400 rounded" key={wine.id}>
                <div className="flex min-h-full items-center">
                    <div className="flex justify-center w-1/4">{wine.name}</div>
                    <div className="flex justify-center w-1/4">{wine.year}</div>
                    <div className="flex justify-center w-1/4">{wine.rating}</div>
                    <div className="flex justify-center w-1/4" key={wine.id}></div>
                </div>
            </div>
            )}
        </div>
    )
}
