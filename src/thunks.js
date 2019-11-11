import axios from 'axios';
import { setMostPopularMovies, setGenre, setMoviesByGenre } from './actions';
import { endpoints } from './config';

const getMostPopularMovies = () => (dispatch) => {
  return axios
    .get(endpoints.mostPopularMovies())
    .then((data) => {
      dispatch(setMostPopularMovies(data.data.results));
    });
};

const getGenre = () => (dispatch) => {
  return axios
    .get(endpoints.genres())
    .then((response) => {
      dispatch(setGenre(response.data.genres));
    });
};

export const getMoviesByGenre = (id) => (dispatch) => {
  return axios
    .get(endpoints.genreMovies(id))
    .then((response) => {
      dispatch(setMoviesByGenre(response.data.results));
    });
};

export const loadInitialData = () => (dispatch) => {
  return Promise.all([
    dispatch(getMostPopularMovies()),
    dispatch(getGenre())
  ]);
};
