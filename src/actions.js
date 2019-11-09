export const toggleCards = (shouldShow) => ({
  type: 'toggleCards',
  shouldShow,
});

export const setMostPopularMovies = (list) => ({
  type: 'setMostPopularMovies',
  list,
});
