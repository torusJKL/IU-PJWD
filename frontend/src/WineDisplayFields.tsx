import RatingStars from "./RatingStars";
import { wineEntry } from "./types";

const WineDisplayFields = ( { wine }: { wine: wineEntry }) => {
    return (
        <>
            <div className="flex justify-center w-1/4">{wine.name}</div>
            <div className="flex justify-center w-1/4">{wine.year}</div>
            <div className="flex justify-center w-1/4">
                <RatingStars rating={wine.rating} />
            </div>
        </>
    )
}

// make the component available to other files
export default WineDisplayFields;