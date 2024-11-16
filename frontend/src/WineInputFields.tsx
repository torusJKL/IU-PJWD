import { wineEntry } from "./types";

// define the parameter for the component
interface Props {
    newWine: wineEntry;
    onWineChange: (wine: wineEntry) => void;
}

const WineInputFields = ( { newWine, onWineChange }: Props ) => {

    // make updates to the state based on the received event name and value
    const handleChange = (event: any): void => {
        
        // assign to local variable for readeaility
        const inputName = event.target.name;
        const inputValue = inputName == "year" ? Number.parseInt(event.target.value) : event.target.value;

        // update the newWine state with the value of the received input field
        onWineChange({
            ...newWine,
            [inputName]: inputValue
        });
    }

    return (
        <>
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
        </>
    )
}

// make the component available to other files
export default WineInputFields;
