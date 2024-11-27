import { wineEntry, wineStatus } from "./types";
import axios from "axios";
import WineInputFields from "./WineInputFields";

// define the parameter for the component
interface Props {
    newWine: wineEntry;
    onWineChange: (wine: wineEntry) => void;
    onAddingWine: (wine: wineEntry) => void;
    onErrorChange: (error: string) => void;
}

const WineInput = ({ newWine, onWineChange, onAddingWine, onErrorChange }: Props) => {
    const addWineToDb = (newWine: wineEntry): void => {

        axios
            // send request with the new wine information to the API
            .post<wineStatus>("http://localhost:3000/addWine",
                {
                    name: newWine.name,
                    year: typeof(newWine.year) == "string" ?
                            Number.parseInt(newWine.year) : newWine.year,
                    rating: typeof(newWine.rating) == "string" ?
                            Number(newWine.rating) : newWine.rating,
                })
            
            // update wine app state once succesfully stored in db
            .then((res) => {
                // make sure we only add existing entries
                if (res.data.wine != undefined){
                    onAddingWine(res.data.wine);

                    // reset error message if any exists
                    onErrorChange("");
                }})

            // write error to console in case of issues
            .catch((err) => {
                console.log(err.response.data);

                // set UI error message
                onErrorChange(err.response.data);
            });
    }

    return (
        <div className="min-h-40 xs:min-h-12 w-5/6 bg-vintage-green rounded">
            <div className="flex flex-col justify-around xs:flex-row min-h-36 xs:min-h-full items-center my-2 xs:my-0">
                <WineInputFields newWine={newWine} onWineChange={ (wine) => onWineChange(wine) } />
                <div className="flex justify-center w-3/4 xs:w-1/4">
                    <button
                        className="bg-vintage-red text-slate-300 font-bold disabled:bg-slate-100 disabled:text-gray-300 px-2 py-1 rounded w-11/12 xs:w-3/6"
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
