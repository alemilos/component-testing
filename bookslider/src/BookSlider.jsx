import React, { useEffect, useRef, useState } from "react";
import Book from "./Book";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";

const BookSlider = ({ number }) => {
  const sliderContainer = useRef();

  const [slidesNumber, setSlidesNumber] = useState(0);

  useEffect(() => {
    function handleResize() {
      console.log(sliderContainer.current.clientWidth);

      setSlidesNumber(
        Math.round(sliderContainer.current.clientWidth / 210 - 1)
      );
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sliderContainer.current]);

  useEffect(() => {
    function handleResize() {
      const leftArrow =
        document.getElementsByClassName("swiper-button-prev")[0];
      const rightArrow =
        document.getElementsByClassName("swiper-button-next")[0];

      console.log(leftArrow);
      console.log(rightArrow);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={sliderContainer}
      onMouseLeave={() => console.log("hiding the arrows")}
      onMouseEnter={() => console.log("showing the arrows")}
      className=" w-full "
    >
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={`${slidesNumber}`}
        allowTouchMove={false}
        slidesPerGroup={slidesNumber}
        navigation
        id="swiper-1"
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {Array.from({ length: number }).map((_, idx) => (
          <SwiperSlide key={idx}>
            <Book key={idx} number={idx + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookSlider;
