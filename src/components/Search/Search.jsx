import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import styled from "styled-components";
import tmdbApi from "../../api/tmdbApi";

const Wrapper = styled.div`
  padding: 84px 72px 200px;
  background-color: var(--bgColor);
`;

const ListWrapper = styled.div`
  padding-bottom: 60px;

  .title {
    margin-bottom: 24px;
  }

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 8px;
  }
`;

function SearchList({ data, title, path }) {
  return (
    <ListWrapper>
      <Typography className="title" variant="h3">
        {title}
      </Typography>
      <Grid container spacing={8}>
        {data.map((item, index) => (
          <Grid
            item
            key={index}
            md={2}
            component={Link}
            to={`/${path}/${item.id}`}
            style={{ textDecoration: "none" }}
          >
            <img src={tmdbApi.getImage(item.poster_path)} />
            <Typography variant="body2">{item.title || item.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </ListWrapper>
  );
}

function Search() {
  const { keyword } = useParams();
  const [searchMovieList, setSearchMovieList] = useState([]);
  const [searchTvList, setSearchTvList] = useState([]);

  const getSearchMovieList = async () => {
    let params = { query: keyword };
    const response = await tmdbApi.search("movie", { params });
    setSearchMovieList(response.results);
  };

  const getSearchTvList = async () => {
    let params = { query: keyword };
    const response = await tmdbApi.search("tv", { params });
    setSearchTvList(response.results);
  };

  useEffect(() => {
    getSearchMovieList();
    getSearchTvList();
  }, [keyword]);

  console.log(searchTvList);
  return (
    <Wrapper>
      {searchMovieList.length > 0 && (
        <SearchList data={searchMovieList} title="Movie" path="movie" />
      )}
      {searchTvList.length > 0 && (
        <SearchList data={searchTvList} title="Tv" path="tv" />
      )}
    </Wrapper>
  );
}

export default Search;
