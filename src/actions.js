export const setMostPopularMovies = (list) => ({
  type: 'setMostPopularMovies',
  list,
});

export const setGenre = (genres) => ({
  type: 'setGenre',
  genres,
});

export const setMoviesByGenre = (movies) => ({
  type: 'setMoviesByGenre',
  movies,
});

export const setLikeMovie = (movieID) => ({
  type: 'setLikeMovie',
  movieID,
});

export const setDislikeMovie = (movieID) => ({
  type: 'setDislikeMovie',
  movieID,
});

export const setLogs = (text) => ({
  type: 'setLogs',
  text,
});
