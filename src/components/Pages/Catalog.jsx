import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";

import tmdbApi, { category as cate } from "../../api/tmdbApi";

import { AppContext } from "../../context/AppProvider";

import { Typography, Grid } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 56px;
  padding-top: 24px;
  padding-bottom: 200px;
  padding-inline: 72px;
  background-color: var(--bgColor);

  .title {
    margin-bottom: 36px;
  }
`;

const ItemWrapper = styled(Grid)`
  margin-bottom: 100px;
`;
const ItemCatalog = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  &:hover {
    img {
      filter: brightness(60%);
    }

    .button {
      opacity: 0.6;
    }
  }

  .button {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    color: black;
    padding: 6px 10px;
    border-radius: 8px;
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

function Catalog() {
  const { category } = useParams();
  const navigate = useNavigate();
  const {
    movieCatalog,
    tvCatalog,
    handleMovieCatalog,
    handleTvCatalog,
    pageCatalog,
    setPageCatalog,
  } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [catalogName, setCatalogName] = useState("");
  const [typeName, setTypeName] = useState("Popular");
  const [catalogList, setCatalogList] = useState([]);
  useEffect(() => {
    if (category != "movie") {
      if (category != "tv") {
        navigate("/");
      } else {
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (category == "movie") {
      setCatalogName("Movie");
      setData(movieCatalog);
    } else {
      setCatalogName("Tv");
      setData(tvCatalog);
    }
  }, [movieCatalog, tvCatalog]);

  useEffect(() => {
    switch (data[0]) {
      case "upcoming": {
        setTypeName("Upcoming");
        break;
      }
      case "popular": {
        setTypeName("Popular");
        break;
      }
      case "top_rated": {
        setTypeName("Top rated");
        break;
      }
      case "on_the_air": {
        setTypeName("On the air");
        break;
      }
    }
    setCatalogList(data[1]);
  }, [data]);

  const handleNext = async () => {
    let response;
    let params = { page: pageCatalog + 1 };
    switch (category) {
      case "movie": {
        response = await tmdbApi.getMoviesList(data[0], { params });
        break;
      }
      case "tv": {
        response = await tmdbApi.getTvList(data[0], { params });
        break;
      }
    }
    setCatalogList([...response.results]);
    setPageCatalog((prev) => prev + 1);
  };

  const handlePrev = async () => {
    let response;
    let params = { page: pageCatalog - 1 };
    switch (category) {
      case "movie": {
        response = await tmdbApi.getMoviesList(data[0], { params });
        break;
      }
      case "tv": {
        response = await tmdbApi.getTvList(data[0], { params });
        break;
      }
    }
    setCatalogList([...response.results]);

    setPageCatalog((prev) => prev - 1);
  };

  useEffect(() => {
    if (category == "movie") {
      handleMovieCatalog(data[0], { page: 1 });
    } else {
      handleTvCatalog(data[0], { page: 1 });
    }
  }, []);

  return (
    <Wrapper>
      <div>
        <Typography variant="h3" className="title">
          {catalogName} - {typeName}
        </Typography>

        <ItemWrapper container spacing={4}>
          {catalogList &&
            catalogList.map((film, index) => {
              return (
                <Grid item key={index} md={2} className="item">
                  <Link
                    to={`/${category}/${film.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ItemCatalog>
                      <img src={tmdbApi.getImage(film.poster_path)} />
                      <Typography variant="body1">
                        {film.title || film.name}
                      </Typography>
                      <Typography variant="body1" className="button">
                        Watch now
                      </Typography>
                    </ItemCatalog>
                  </Link>
                </Grid>
              );
            })}
        </ItemWrapper>
      </div>

      <ButtonWrapper>
        {pageCatalog > 1 && (
          <Typography
            style={{ cursor: "pointer" }}
            variant="body1"
            onClick={() => handlePrev()}
          >
            Prev
          </Typography>
        )}
        <Typography variant="body1">{pageCatalog}</Typography>
        <Typography
          style={{ cursor: "pointer" }}
          variant="body1"
          onClick={() => handleNext()}
        >
          Next
        </Typography>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Catalog;
