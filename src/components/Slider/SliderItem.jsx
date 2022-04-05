import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import tmdbApi from "../../api/tmdbApi";

import { Grid, Typography } from "@mui/material";

const Wrapper = styled.div`
  height: calc(100vh - 56px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: url(${(props) => props.background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: brightness(60%);
  }
`;

const Container = styled(Grid)`
  img {
    height: 60vh;
    border-radius: 16px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
const TextContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 100px;

  .title {
    margin-bottom: 24px;
  }

  .description {
    margin-bottom: 20px;
    font-weight: 600;
  }

  .button {
    cursor: pointer;
    background: transparent;
    padding: 8px 0;
    font-size: 18px;
    border-radius: 17px;
    width: 200px;
    border: none;
    outline: 3px solid white;
    text-align: center;

    &:hover {
      background-color: white;
      color: black;
    }
  }
`;

function SliderItem({ movie }) {
  const imageBg = tmdbApi.getImage(movie.backdrop_path);
  const image = tmdbApi.getImage(movie.poster_path);

  return (
    <Wrapper background={imageBg}>
      <Container container>
        <Grid item md={2} xs={1}></Grid>
        <Grid item md={3} xs={4}>
          <img src={image} />
        </Grid>
        <Grid item md={5} xs={6}>
          <TextContainer>
            <Typography variant="h3" className="title">
              {movie.title}
            </Typography>
            <Typography variant="body2" className="description">
              {movie.overview}
            </Typography>
            <Link
              to={`/movie/${movie.id}`}
              style={{ textDecoration: "none" }}
              className="button"
            >
              Watch now
            </Link>
          </TextContainer>
        </Grid>
        <Grid item md={2} xs={1}></Grid>
      </Container>
    </Wrapper>
  );
}

export default SliderItem;
