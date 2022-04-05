import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi, { movieType } from "../../api/tmdbApi";
import SliderItem from "./SliderItem";

import "swiper/css";

function Slider() {
  const [sliderItemList, setSliderItemList] = useState([]);

  const getMovies = async () => {
    const params = { page: 1 };
    try {
      const response = await tmdbApi.getMoviesList(movieType.popular, {
        params,
      });
      setSliderItemList(response.results.slice(0, 8));
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <Swiper spaceBetween={0} slidesPerView={1}>
      {sliderItemList.map((movie, index) => {
        return (
          <SwiperSlide key={index}>
            <SliderItem movie={movie} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;
