import { combineReducers } from 'redux';

const initialStateOfCards = {
  mostPopular: [],
};

const cards = (state = initialStateOfCards, action) => {
  switch (action.type) {
  case 'setMostPopularMovies': return {
    ...state,
    mostPopular: action.list,
  };
  case 'setMoviesByGenre': return {
    ...state,
    mostPopular: action.movies,
  };
  default: return state;
  }
};

const initialStateOfGenres = {
  genres: [],
};

const genres = (state = initialStateOfGenres, action) => {
  switch (action.type) {
  case 'setGenre': return {
    ...state,
    genres: action.genres,
  };
  default: return state;
  }
};

const initialStateOfLikedMovies = {
  likedMovies: [],
};

const likeMovie = (state = initialStateOfLikedMovies, action) => {
  switch (action.type) {
  case 'setLikeMovie': return {
    ...state,
    likedMovies: [...state.likedMovies, action.movieID],
  };
  case 'setDislikeMovie': {
    const { likedMovies } = state;
    const copyOfLikedMovies = [...likedMovies];
    const indexOfLikedMovieId = copyOfLikedMovies.findIndex((likedId) => likedId === action.movieID);

    if(indexOfLikedMovieId !== -1) {
      copyOfLikedMovies.splice(indexOfLikedMovieId, 1);
      return {
        ...state,
        likedMovies: copyOfLikedMovies,
      };
    }

    return {
      ...state,
    };
  }
  default: return state;
  }
};

const logs = (state = {}, action) => {
  switch (action.type) {
  case 'setLogs': {
    const timestamp = new Date().toISOString();
    return {
      ...state,
      [timestamp]: action.text,
    };
  }
  default: return state;
  }
};

export const rootReducer = combineReducers({
  cards,
  genres,
  likeMovie,
  logs
});
