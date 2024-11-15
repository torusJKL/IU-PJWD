
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
