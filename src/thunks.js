import axios from 'axios';
import { setMostPopularMovies, setGenre, setMoviesByGenre } from './actions';
import { endpoints } from './config';

export const getMostPopularMovies = () => (dispatch) => {
  axios
    .get(endpoints.mostPopularMovies())
    .then((data) => {
      dispatch(setMostPopularMovies(data.data.results));
    });
};

export const getGenre = () => (dispatch) => {
    axios
    .get(endpoints.genres())
    .then((response) => {
        dispatch(setGenre(response.data.genres));
    });
};

export const getMoviesByGenre = (id) => (dispatch) => {
    axios
    .get(endpoints.genreMovies(id))
    .then((response) => {
        dispatch(setMoviesByGenre(response.data.results));
    });
};
