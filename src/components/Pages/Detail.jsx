import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";

import { Swiper, SwiperSlide } from "swiper/react";

import { Grid, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 56px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bgColor);
  }
`;

const ItemDetail = styled(Grid)`
  height: calc(100vh - 56px);
  position: relative;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.bgimage});
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(1px) brightness(40%);
  }

  .imgContainer {
    cursor: pointer;
    position: relative;

    &:hover {
      img {
        filter: brightness(60%);
      }

      .button {
        opacity: 0.6;
      }
    }

    img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .button {
      background-color: white;
      color: black;
      padding: 8px 0;
      width: 120px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: calc(50% - 60px);
      trasform: translateY(-50%);
      opacity: 0;
      border-radius: 8px;

      &:hover {
        opacity: 1;
      }
    }
  }

  .textContainer {
    height: 100%;
    padding-top: 10vh;

    .title {
      margin-bottom: 18px;
    }

    .description {
      margin-bottom: 12px;
    }

    .des {
      margin-bottom: 6px;
    }

    img {
      width: 100%;
      border-radius: 8px;
    }
  }
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 24px;

  &::before {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    background-color: black;
    opacity: 0.9;
  }

  iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 80vw;
    height: 80vh;
  }
`;

const CloseButton = styled(Close)`
  cursor: pointer;
  position: absolute;
  right: 24px;
`;

function CastWrapper({ cast }) {
  return (
    <div>
      <img src={tmdbApi.getImage(cast.profile_path)} />
      <Typography variant="caption">{cast.name}</Typography>
    </div>
  );
}

function Detail() {
  const { category, id } = useParams();
  const [item, setItem] = useState({});
  const [genreList, setGenreList] = useState([]);

  const bgImage = tmdbApi.getImage(item.backdrop_path);

  const getDetail = async () => {
    const params = {};
    const response = await tmdbApi.detail(category, id, { params });
    setItem(response);
  };

  // const genreMovie = async (cate) => {
  //   try {
  //     const response = await tmdbApi.getGenre(cate);
  //     setGenreList(response.genres);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  useEffect(() => {
    getDetail();
    // genreMovie(category);
  }, [category, id]);

  // console.log(Array.isArray(videoList));

  useEffect(() => {
    setGenreList(item.genres);
  }, [item]);

  const [casts, setCasts] = useState([]);

  const getCasts = async () => {
    const response = await tmdbApi.credits(category, id);
    setCasts(response.cast.slice(0, 8));
  };

  const [showModal, setShowModal] = useState(false);

  const [videoYtb, setVideoYtb] = useState({});

  const getVid = async () => {
    const response = await tmdbApi.getVideos(category, id);
    let res = response.results.find((item) => item.name == "Official Trailer");
    setVideoYtb(`https://www.youtube.com/embed/${res.key}`);
  };

  useEffect(() => {
    getCasts();
    getVid();
  }, [category, id]);

  return (
    <Wrapper>
      <ItemDetail container bgimage={bgImage}>
        <Grid item md={2} />
        <Grid item md={3} className="imgContainer">
          <img src={tmdbApi.getImage(item.poster_path)} />
          <Typography
            className="button"
            variant="body1"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Watch now
          </Typography>
        </Grid>
        <Grid item md={1} />
        <Grid className="textContainer" item md={4}>
          <Typography variant="h3" className="title">
            {item.title || item.name}
          </Typography>
          <Typography variant="body1" className="description">
            {item.overview}
          </Typography>
          <Typography className="des" variant="subtitle2">
            Release date: {item.release_date}
          </Typography>
          <Typography className="des genre" variant="subtitle2">
            Genres:
            {genreList &&
              genreList.map((genre, index) => (
                <span key={index}>
                  {" "}
                  {genre.name}
                  {index < genreList.length - 1 ? "," : "."}
                </span>
              ))}
          </Typography>
          <Typography className="des" variant="subtitle2">
            Score: {item.vote_average}
          </Typography>
          <Typography variant="subtitle2">Cast:</Typography>
          <Swiper slidesPerView={4.5} spaceBetween={16}>
            {casts.map((cast, index) => (
              <SwiperSlide key={index}>
                <CastWrapper cast={cast} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item md={2} />
      </ItemDetail>
      {showModal && (
        <VideoModal
          onClick={() => {
            setShowModal(false);
          }}
        >
          <CloseButton
            onClick={() => {
              setShowModal(false);
            }}
          />
          <iframe src={videoYtb} />
        </VideoModal>
      )}
    </Wrapper>
  );
}

export default Detail;
