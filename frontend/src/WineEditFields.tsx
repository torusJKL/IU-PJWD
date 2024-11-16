import { wineEntry } from "./types";

// define the parameter for the component
interface Props {
    wine: wineEntry;
    wines: wineEntry[];
    onWineChange: (wines: wineEntry[]) => void;
}

const WineEditFields = ( { wine, wines, onWineChange }: Props ) => {
    // make updates to the state based on the received event name and value
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        // assign to local variable for readeaility and convert year & rating to number
        const inputName = event.target.name;
        const inputValue = event.target.name != "name" &&
                            typeof(event.target.value) == "string" ?
                            Number.parseInt(event.target.value) : event.target.value;

        // build the updated wine object
        const updatedWine = {
            ...wine,
            [inputName]: inputValue
        };

        // change the value of the wine in place so that the position doesn't change
        const newWines = [...wines]
        for (let i = 0; i < newWines.length; ++i){
            // skip if this is the incorrect wine entry
            if (newWines[i].id != updatedWine.id)
                continue;
            
            // assign all values, even if the value didn't change
            newWines[i].name = updatedWine.name;
            newWines[i].year = updatedWine.year;
            newWines[i].rating = updatedWine.rating;
        }

        // update the wine state with the value of the received input field
        onWineChange(newWines);
    }

    return (
        <>
            <div className="flex justify-center w-1/4">
                <input
                    type="text"
                    className="w-5/6 px-2 py-1 rounded"
                    name="name"
                    value = { wine.name }
                    onChange={ (event) => handleChange(event) } />
            </div>
            <div className="flex justify-center w-1/4">
                <input
                    type="text"
                    className="text-center w-3/6 px-2 py-1 rounded"
                    name="year"
                    value = { wine.year == 0 ? new Date().getFullYear() : wine.year }
                    onChange={ (event) => handleChange(event) } />
            </div>
            <div className="flex justify-center w-1/4">
                <select
                    className="text-center w-3/6 px-2 py-1 rounded"
                    name="rating"
                    onChange={ (event) => handleChange(event) }
                    value={wine.rating}>
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
export default WineEditFields;
