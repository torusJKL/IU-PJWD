import axios from "axios";
import { faCheck, faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { wineEntry, wineStatus } from "./types";

// define the parameter for the component
interface Props {
    wines: wineEntry[];
    wine: wineEntry;
    winesInEditMode: number[];
    onWineAction: (wines: wineEntry[]) => void;
    onEditModeChange: (wines: number[]) => void;
    onErrorChange: (error: string) => void;
}

// a set to keep old state of the wines (before edit)
const wineUndoSet = new Set<wineEntry>();

const WineActions = ({ wines, wine, winesInEditMode, onWineAction, onEditModeChange, onErrorChange }: Props) => {
    const editWine = (wine: wineEntry): void => {
        // add the current wine to the list of wines in edit mode
        onEditModeChange([...winesInEditMode, wine.id]);

        // clone the object so that user edits will not change the values
        const clone = structuredClone(wine);
        // add the cloned wine to the set in case we need the old values
        wineUndoSet.add(clone);
    }
    
    const cancelEditWine = (wine: wineEntry): void => {
        // remove the current wine id from the list of wines in edit mode
        onEditModeChange(winesInEditMode.filter(w => w != wine.id));

        wineUndoSet.forEach(oldWineState => {
            // skip unrelated entries
            if (oldWineState.id != wine.id)
                return;

            // restore the old values in the original object
            wine.name = oldWineState.name;
            wine.year = oldWineState.year;
            wine.rating = oldWineState.rating;

            // remove the entry from the set
            wineUndoSet.delete(oldWineState);
        })
    }
    
    const updateWine = (wine: wineEntry): void => {
        // remove the current wine id from the list of wines in edit mode
        onEditModeChange(winesInEditMode.filter(w => w != wine.id));

        // remove the cloned wine state from the set
        wineUndoSet.forEach(oldWineState => {
            // skip unrelated entries
            if (oldWineState.id != wine.id)
                return;

            // remove the entry from the set
            wineUndoSet.delete(oldWineState);
        })

        axios
            // update the database with the new wine values
            .put<wineStatus>("http://localhost:3000/updateWine",
                {
                    id: wine.id,
                    name: wine.name,
                    year: wine.year,
                    rating: wine.rating,
                })
            .then(() => {
                // reset the error message if any exists
                onErrorChange("");
            })
    
            .catch((err) => {
                console.error("Unable to update wine: ", err.response.data);

                // set UI error message
                onErrorChange(err.response.data);
            })
    }
    
    const deleteWine = (wine: wineEntry): void => {
        // remove the current wine id from the list of wines in edit mode
        onEditModeChange(winesInEditMode.filter(w => w != wine.id));
        
        // store the current state of wines in case we need to rollback the delete
        const originalWines = [...wines];
    
        // remove the wine from the state to immediatelly update the UI
        onWineAction(wines.filter(w => w.id != wine.id));
    
        axios
            // delete the selected wine from the DB
            .delete<wineStatus>(`http://localhost:3000/deleteWine`, { data: { id: wine.id } })

            .then(() => {
                // reset the error message if any exists
                onErrorChange("");
            })
    
            // in case there is an issue print the error to the console
            // and return the wines state to the original state
            .catch((err) => {
                console.error(err.response.data);

                // undo the wine UI change
                onWineAction(originalWines);

                // set UI error message
                onErrorChange(err.response.data);
            });
    };

    if (winesInEditMode.includes(wine.id)){
        return (
            <>
                <div className="px-2"
                        onClick={ () => { cancelEditWine(wine) }}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <div className="px-2"
                        onClick={ () => { updateWine(wine) }}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </>
        ) 
    }

    return (
        <>
            <div className="px-2"
                    onClick={ () => { editWine(wine) }}>
                <FontAwesomeIcon icon={faEdit} />
            </div>
            <div className="px-2"
                    onClick={ () => { deleteWine(wine) }}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </>
    )
}

// make the component available to other files
export default WineActions;
