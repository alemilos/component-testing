import React, { useRef, useState } from "react";

const Book = ({ number }) => {
  const bookRef = useRef();

  const [hover, setHover] = useState(false);

  function handleHoverBook() {
    setHover(true);
    if (bookRef.current) {
      bookRef.current.style.transform = `translateY(-80px)`;
    }
  }

  function handleBookLeave() {
    setHover(false);
    if (bookRef.current) {
      bookRef.current.style.transform = "";
    }
  }

  return (
    <div onMouseEnter={handleHoverBook} onMouseLeave={handleBookLeave}>
      <div
        ref={bookRef}
        className={`h-80 bg-[#5f5f5f] min-w-48  rounded-md flex items-center justify-center transition-all`}
      >
        <p className="text-3xl text-white">{number}</p>
      </div>

      {hover ? (
        <div className="absolute w-full h-16 transition-all translate-y-[-66px] flex justify-around items-center">
          <div className="w-20 h-9 bg-[white] rounded-full"></div>
          <div className="border border-white rounded-full h-9 w-9"></div>
          <div className="border border-white rounded-full h-9 w-9"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Book;
