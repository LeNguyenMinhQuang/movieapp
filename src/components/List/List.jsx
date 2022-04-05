import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi from "../../api/tmdbApi";
import { AppContext } from "../../context/AppProvider";

import styled from "styled-components";

import "swiper/css";

const Wrapper = styled.div`
  padding: 72px 72px 0 72px;
  .text {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .seemore {
      padding-top: 18px;
      cursor: pointer;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }
  }

  & > div {
    .container {
      margin: 0;
    }
  }
`;

const ItemWrapper = styled.div`
  height: 100%;
  width: 180px;
  position: relative;
  cursor: pointer;

  &:hover > img {
    filter: brightness(60%);
  }

  &:hover > .button {
    opacity: 0.6;
  }

  img {
    width: 180px;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  .button {
    cursor: pointer;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    color: black;
    padding: 4px 4px;
    border-radius: 8px;
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }
`;

function ListItem({ movie, title }) {
  return (
    <ItemWrapper>
      <Link
        to={`/${title == "Movie" ? "movie" : "tv"}/${movie.id}`}
        style={{ textDecoration: "none" }}
      >
        <img src={tmdbApi.getImage(movie.poster_path)} />
        <Typography variant="h6">{movie.title || movie.name}</Typography>
        <Typography variant="body1" className="button">
          Watch now
        </Typography>
      </Link>
    </ItemWrapper>
  );
}

function List({ title, data }) {
  const { handleMovieCatalog, handleTvCatalog } = useContext(AppContext);

  return (
    <Wrapper>
      <div className="text">
        <Typography variant="h4" className="title">
          {title}
        </Typography>
        <Typography
          component={Link}
          to={title == "Movie" ? "/movie" : "/tv"}
          variant="body2"
          className="seemore"
          style={{ textDecoration: "none" }}
          onClick={
            title == "Movie"
              ? () => handleMovieCatalog()
              : () => handleTvCatalog()
          }
        >
          See more
        </Typography>
      </div>
      <div>
        <Grid container className="container">
          <Swiper slidesPerView={6.5}>
            {data.map((movie, index) => (
              <SwiperSlide key={index}>
                <Grid item md={2} className="item">
                  <ListItem movie={movie} title={title} />
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </div>
    </Wrapper>
  );
}

export default List;
