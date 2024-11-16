import { wineEntry } from "./types";
import axios from "axios";
import WineInputFields from "./WineInputFields";

// define the parameter for the component
interface Props {
    newWine: wineEntry;
    onWineChange: (wine: wineEntry) => void;
    onAddingWine: (wine: wineEntry) => void;
}

const WineInput = ({ newWine, onWineChange, onAddingWine }: Props) => {
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
                <WineInputFields newWine={newWine} onWineChange={ (wine) => onWineChange(wine) } />
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

// make the component available to other files
export default WineInput;
