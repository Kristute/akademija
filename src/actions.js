export const toggleCards = (shouldShow) => ({
  type: 'toggleCards',
  shouldShow,
});

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
