import axios from 'axios';
import { setMostPopularMovies } from './actions';
import { endpoints } from './config';

export const getMostPopularMovies = () => (dispatch) => {
  axios
    .get(endpoints.mostPopularMovies())
    .then((data) => {
      dispatch(setMostPopularMovies(data.data.results));
    });
};
