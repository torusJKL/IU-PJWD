import axios from "axios";
import { faCheck, faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { wineEntry } from "./types";

// define the parameter for the component
interface Props {
    wines: wineEntry[];
    wine: wineEntry;
    winesInEditMode: number[];
    onWineAction: (wines: wineEntry[]) => void;
    onEditModeChange: (wines: number[]) => void;
}

const WineActions = ({ wines, wine, winesInEditMode, onWineAction, onEditModeChange }: Props) => {
    const editWine = (wine: wineEntry): void => {
        // add the current wine to the list of wines in edit mode
        onEditModeChange([...winesInEditMode, wine.id]);
    }
    
    const cancelEditWine = (wine: wineEntry): void => {
        // remove the current wine id from the list of wines in edit mode
        onEditModeChange(winesInEditMode.filter(w => w != wine.id));
    }
    
    const updateWine = (wine: wineEntry): void => {
        // remove the current wine id from the list of wines in edit mode
        onEditModeChange(winesInEditMode.filter(w => w != wine.id));

        console.log("updating wine: ", JSON.stringify(wine))
    
        axios
            .put("http://localhost:3000/updateWine",
                {
                    id: wine.id,
                    name: wine.name,
                    year: wine.year,
                    rating: wine.rating,
                })
            .then()
    
            .catch((err) => console.error("Unable to update wine: ", err))
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
            .delete(`http://localhost:3000/deleteWine`, { data: { id: wine.id } })
    
            // in case there is an issue print the error to the console
            // and return the wines state to the original state
            .catch((err) => {
                console.log(err);
                onWineAction(originalWines)
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
