import { wineEntry } from "./types";
import WineDisplayFields from "./WineDisplayFields";
import WineEditFields from "./WineEditFields";

// define the parameter for the component
interface Props {
    wine: wineEntry;
    wines: wineEntry[];
    winesInEditMode: number[];
    onWineChange: (wines: wineEntry[]) => void;
}

const WineFields = ( { wine, wines, winesInEditMode, onWineChange }: Props) => {
    if (winesInEditMode.includes(wine.id)){
        return (
            <WineEditFields
                wine={wine}
                wines={wines}
                onWineChange={ (wines) => onWineChange(wines) }
            />
        )
    }

    return (
        <WineDisplayFields wine={wine} />
    )
}

// make the component available to other files
export default WineFields;
