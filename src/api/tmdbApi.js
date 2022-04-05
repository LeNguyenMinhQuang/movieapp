import axiosClient from "./axiosClient";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const api_key = "?api_key=505b6036ddbadb239407652df5bafc34";

const tmdbApi = {
  getGenre: (cate) => {
    const url = "genre/" + category[cate] + "/list" + api_key;
    return axiosClient.get(url);
  },
  getImage: (imgpath) => {
    return `https://image.tmdb.org/t/p/original/${imgpath}`;
  },
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type] + api_key;
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type] + api_key;
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos" + api_key;
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = "search/" + category[cate] + api_key;
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id + api_key;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits" + api_key;
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar" + api_key;
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
