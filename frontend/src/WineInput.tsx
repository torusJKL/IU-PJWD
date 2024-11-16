import { useState } from "react";
import { wineEntry } from "./types";
import axios from "axios";

// define the parameter of the onSelect function
interface Props {
    onAddingWine: (wine: wineEntry) => void;
}

const WineInput = ({ onAddingWine }: Props) => {
    // app state to store the input values before sending to the API
    const [newWine, setNewWine] = useState<wineEntry>({
        id: 0,
        name: "",
        year: new Date().getFullYear(),
        rating: 1,
    });

    // make updates to the state based on the received event name and value
    const handleChange = (event: any): void => {
        
        // assign to local variable for readeaility
        const inputName = event.target.name;
        const inputValue = inputName == "year" ? Number.parseInt(event.target.value) : event.target.value;

        // update the newWine state with the value of the received input field
        setNewWine({
            ...newWine,
            [inputName]: inputValue
        });
    }

    const addWineToDb = (newWine: wineEntry): void => {

        // send request with the new wine information to the API
        axios
            .post<wineEntry>("http://localhost:3000/addWine",
                {
                    name: newWine.name,
                    year: typeof(newWine.year) == "string" ?
                            Number.parseInt(newWine.year) : newWine.year,
                    rating: typeof(newWine.rating) == "string" ?
                            Number(newWine.rating) : newWine.rating,
                })
            
            // update wine app state once succesfully stored in db
            .then((res) => onAddingWine(res.data))

            // write error to console in case of issues
            .catch((err) => console.log(err));
    }

    return (
        <div className="min-h-14 w-5/6 bg-amber-300 rounded">
            <div className="flex min-h-full items-center">
                <div className="flex justify-center w-1/4">
                    <input
                        type="text"
                        className="w-5/6 px-2 py-1 rounded"
                        name="name"
                        value = { newWine.name }
                        onChange={ (event) => handleChange(event) } />
                </div>
                <div className="flex justify-center w-1/4">
                    <input
                        type="text"
                        className="text-center w-3/6 px-2 py-1 rounded"
                        name="year"
                        value = { newWine.year == 0 ? new Date().getFullYear() : newWine.year }
                        onChange={ (event) => handleChange(event) } />
                </div>
                <div className="flex justify-center w-1/4">
                    <select
                        className="text-center w-3/6 px-2 py-1 rounded"
                        name="rating"
                        onChange={ (event) => handleChange(event) }
                        value={newWine.rating}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="flex justify-center w-1/4">
                    <button
                        className="bg-orange-300 disabled:bg-slate-100 disabled:text-gray-300 px-2 py-1 rounded w-3/6"
                        disabled={newWine.name == "" || newWine.year == null}
                        onClick={ () => addWineToDb(newWine) }>
                            Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WineInput;