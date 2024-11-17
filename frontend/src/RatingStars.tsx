import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RatingStars = ( { rating }: { rating: number } ) => {
    return (
        <>
            {/* use 5 stars to display rating */}
            <div className="flex items-center">
                {/* change css for star color fill based on wine rating */}
                <FontAwesomeIcon icon={faStar} className={(rating >= 1 ? "text-yellow-300" : "text-gray-300")} />
                <FontAwesomeIcon icon={faStar} className={(rating >= 2 ? "text-yellow-300" : "text-gray-300")} />
                <FontAwesomeIcon icon={faStar} className={(rating >= 3 ? "text-yellow-300" : "text-gray-300")} />
                <FontAwesomeIcon icon={faStar} className={(rating >= 4 ? "text-yellow-300" : "text-gray-300")} />
                <FontAwesomeIcon icon={faStar} className={(rating >= 5 ? "text-yellow-300" : "text-gray-300")} />
            </div>
        </>
    )
}

// make the component available to other files
export default RatingStars;
