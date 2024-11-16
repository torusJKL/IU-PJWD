// define the parameter for the component
interface Props {
    onSelectRating: (rating: string) => void;
}

// Rating selector component that provides the selected value in the Props
const RatingSelector = ({ onSelectRating }: Props) => {
    return (
        <select className="text-center rounded bg-red-300"
          // store selected rating to app state every time a change is registered
          onChange={(event) => {onSelectRating(event.target.value)}}>

            {/* dropdown values and viable text*/}
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    )
}

// make the component available to other files
export default RatingSelector
