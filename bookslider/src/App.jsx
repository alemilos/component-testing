import { useEffect, useState } from "react";
import BookSlider from "./BookSlider";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

function App() {
  const [booksNumber, setBooksNumber] = useState("");

  function handleNumberChange(e) {
    if (e.target.value < 100) {
      setBooksNumber(e.target.value);
    }
  }

  return (
    <div className="bg-[black] w-screen h-screen p-4 flex flex-col gap-32 items-center">
      <div className="text-white w-full flex flex-col gap-4 items-center justify-center">
        <p>How many books ?</p>
        <input
          type="number"
          className="rounded-lg bg-[#4f4f4f] outline-none p-2"
          onChange={handleNumberChange}
          value={booksNumber}
        />
      </div>

      <div className="flex justify-center w-full ">
        <BookSlider number={booksNumber} />
      </div>
    </div>
  );
}

export default App;
