import React, { useContext } from "react";
import Slider from "../Slider/Slider";
import List from "../List/List";

import { AppContext } from "../../context/AppProvider";

import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--bgColor);
  margin-top: 56px;
  padding-bottom: 120px;
`;
function Home() {
  const appData = useContext(AppContext);
  const { movieList, tvList } = appData;
  return (
    <Wrapper>
      <Slider />
      <List title="Movie" data={movieList} />
      <List title="Tv" data={tvList} />
    </Wrapper>
  );
}

export default Home;
