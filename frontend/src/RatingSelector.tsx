// define the parameter for the component
interface Props {
    onSelectRating: (rating: string) => void;
}

// Rating selector component that provides the selected value in the Props
const RatingSelector = ({ onSelectRating }: Props) => {
    return (
        <select className="text-center py-1 font-bold rounded bg-vintage-red text-slate-300"
          // store selected rating to app state every time a change is registered
          onChange={(event) => {onSelectRating(event.target.value)}}>

            {/* dropdown values and viewable text*/}
            <option value="">Show all ratings</option>
            <option value="1">1 Star only</option>
            <option value="2">2 Stars only</option>
            <option value="3">3 Stars only</option>
            <option value="4">4 Stars only</option>
            <option value="5">5 Stars only</option>
        </select>
    )
}

// make the component available to other files
export default RatingSelector
