import { useState } from "react";
import WineList from "./WineList";
import RatingSelector from "./RatingSelector";

function App() {
  // app state storage for the rating
  const [rating, setRating] = useState<string>("");

  return (
    <div className="min-h-screen bg-vintage-beige">
      {/* use centered grid layout for title and drop down*/}
      <div className="grid items-center justify-center text-center pt-4">
        <div>
          <h1 className="text-4xl text-black font-bold">Wine list</h1>
        </div>

        {/* inject rating selector component and retrieve rating */}
        <RatingSelector onSelectRating={(rating) => setRating(rating)} />
      </div>

      {/* inject the Winelist component and provide it the rating value */}
      <WineList rating={rating}/>
    </div>
  )
}

export default App;
