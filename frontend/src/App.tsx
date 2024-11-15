import { useState } from "react";
import { WineList } from "./WineList";

function App() {
  // app state storage for the rating
  const [rating, setRating] = useState<string>("");

  return (
    // react can only have 1 top element hence we wrap all of them with this pseudo tag
    <>
      {/* use centered grid layout for title and drop down*/}
      <div className="grid items-center justify-center text-center pt-4">
        <div>
          <h1 className="text-4xl text-black font-bold">Wine list</h1>
        </div>

        <select className="form-select text-center rounded bg-red-300"
          // store selected rating to app state every time a change is registered
          onChange={(event) => {setRating(event.target.value)}}>

            {/* dropdown values and viable text*/}
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
      </div>

      {/* inject the Winelist component and provide it the rating value */}
      <WineList rating={rating}/>
    </>
  )
}

export default App;
