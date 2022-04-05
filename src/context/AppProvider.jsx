import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import tmdbApi, { movieType, tvType } from "../api/tmdbApi";

const AppContext = createContext();
function AppProvider({ children }) {
  const authData = useContext(AuthContext);
  const { user } = authData;
  const [showHeader, setShowHeader] = useState(false);
  const [navBarShow, setNavBarShow] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [slideMovie, setSlideMovie] = useState(false);
  const [slideTv, setSlideTv] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [movieCatalog, setMovieCatalog] = useState([]);
  const [tvCatalog, setTvCatalog] = useState([]);
  const [pageCatalog, setPageCatalog] = useState(1);
  const [searchInp, setSearchInp] = useState("");

  console.log(searchInp);
  //List

  const getMovies = async () => {
    const params = { page: 1 };
    try {
      const response = await tmdbApi.getMoviesList(movieType.popular, params);
      setMovieList(response.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTv = async () => {
    const params = { page: 1 };
    try {
      const response = await tmdbApi.getTvList(tvType.popular, params);
      setTvList(response.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  // End of List

  const getMovieCatalog = async (type, pageNumber) => {
    const params = { page: pageNumber };
    try {
      const response = await tmdbApi.getMoviesList(type, { params });
      setMovieCatalog([type, [...response.results]]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTvCatalog = async (type, pageNumber) => {
    const params = { page: pageNumber };
    try {
      const response = await tmdbApi.getTvList(type, { params });
      setTvCatalog([type, [...response.results]]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleMovieCatalog = (type = "popular", pageNumber = 1) => {
    getMovieCatalog(type, pageNumber);
    setPageCatalog(1);
  };

  const handleTvCatalog = (type = "popular", pageNumber = 1) => {
    getTvCatalog(type, pageNumber);
    setPageCatalog(1);
  };

  useEffect(() => {
    getMovies();
    getTv();
  }, []);

  useEffect(() => {
    user.displayName ? setShowHeader(true) : setShowHeader(false);
  }, [user]);
  return (
    <AppContext.Provider
      value={{
        showHeader,
        navBarShow,
        setNavBarShow,
        showLogOut,
        setShowLogOut,
        slideMovie,
        setSlideMovie,
        slideTv,
        setSlideTv,
        movieList,
        tvList,
        movieCatalog,
        handleMovieCatalog,
        tvCatalog,
        handleTvCatalog,
        pageCatalog,
        setPageCatalog,
        searchInp,
        setSearchInp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
