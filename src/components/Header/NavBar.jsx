import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { AppContext } from "../../context/AppProvider";

const NavBarWrapper = styled.div`
  top: 56px;
  background-color: var(--bgColorHeader);
  position: fixed;
  z-index: 2;
  overflow: hidden;
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  width: ${(props) => (props.show ? "15vw" : "0")};

  .typeButton {
    padding: 8px 0px 8px 24px;
    cursor: pointer;
    border-bottom: 1px solid hsla(0, 0%, 53.3%, 0.4);
    display: flex;
    transition: all 0.3s;
    color: rgba(255, 255, 255, 0.4);

    svg {
      opacity: 0.4;
    }

    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }

  .typeButton.child {
    padding-left: 36px;

    &:hover {
      padding-left: 44px;
    }
  }
`;

const TypoChildMovie = styled.div`
  overflow: hidden;
  height: ${(props) => (props.show ? "111px" : 0)};
`;

const TypoChildTv = styled.div`
  overflow: hidden;
  height: ${(props) => (props.show ? "111px" : 0)};
`;

function NavBar({ show }) {
  const appData = useContext(AppContext);
  const {
    slideMovie,
    setSlideMovie,
    slideTv,
    setSlideTv,
    handleMovieCatalog,
    handleTvCatalog,
  } = appData;
  const handleSlideMovie = () => {
    setSlideMovie(!slideMovie);
  };
  const handleSlideTv = () => {
    setSlideTv(!slideTv);
  };

  return (
    <NavBarWrapper show={show}>
      <Typography
        className="typeButton"
        variant="body1"
        onClick={() => handleSlideMovie()}
        style={{ textDecoration: "none" }}
      >
        Movies
        {slideMovie ? <ArrowDropDown /> : <ArrowDropUp />}
      </Typography>
      <TypoChildMovie show={slideMovie}>
        <Typography
          component={Link}
          to="/movie"
          className="typeButton child"
          variant="body2"
          onClick={() => handleMovieCatalog("upcoming")}
          style={{ textDecoration: "none" }}
        >
          Upcoming
        </Typography>
        <Typography
          component={Link}
          to="/movie"
          className="typeButton child"
          variant="body2"
          onClick={() => handleMovieCatalog("popular")}
          style={{ textDecoration: "none" }}
        >
          Popular
        </Typography>
        <Typography
          component={Link}
          to="/movie"
          className="typeButton child"
          variant="body2"
          onClick={() => handleMovieCatalog("top_rated")}
          style={{ textDecoration: "none" }}
        >
          Top rated
        </Typography>
      </TypoChildMovie>
      <Typography
        className="typeButton"
        variant="body1"
        onClick={() => handleSlideTv()}
        style={{ textDecoration: "none" }}
      >
        TV Series
        {slideTv ? <ArrowDropDown /> : <ArrowDropUp />}
      </Typography>
      <TypoChildTv show={slideTv}>
        <Typography
          component={Link}
          to="/tv"
          className="typeButton child"
          variant="body2"
          onClick={() => handleTvCatalog("on_the_air")}
          style={{ textDecoration: "none" }}
        >
          On the air
        </Typography>
        <Typography
          component={Link}
          to="/tv"
          className="typeButton child"
          variant="body2"
          onClick={() => handleTvCatalog("popular")}
          style={{ textDecoration: "none" }}
        >
          Popular
        </Typography>
        <Typography
          component={Link}
          to="/tv"
          className="typeButton child"
          variant="body2"
          onClick={() => handleTvCatalog("top_rated")}
          style={{ textDecoration: "none" }}
        >
          Top rated
        </Typography>
      </TypoChildTv>
    </NavBarWrapper>
  );
}

export default NavBar;
