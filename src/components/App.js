import React from 'react';
import { connect } from 'react-redux';
import { loadInitialData } from '../thunks';
import { setLogs } from '../actions';
import Card from './Card';
import GenresButton from './GenresButton';
import { getImageUrl } from '../config';

class App extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    this.props.onSetLog('Aplikacija uzkrauta');
  };

  render() {
    return (
      <div>
        <div>
          {this.props.genres.map((genre) => (
            <GenresButton
              key={genre.id}
              genre={genre}
            />
          ))}
        </div>
        <div>
          {this.props.mostPopularMovies ? this.props.mostPopularMovies.map((card) => (
            <Card
              key={card.original_title + card.id}
              backgroundImage={getImageUrl(card.backdrop_path)}
              date={card.release_date}
              rating={card.vote_average}
              votes={card.vote_count}
              description={card.overview}
              title={card.original_title}
              id={card.id}
            />
          ))
            : <div>loading</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mostPopularMovies: state.cards.mostPopular,
  genres: state.genres.genres,
});
const mapDispatchToProps = (dispatch) => ({
  loadInitialData: () => dispatch(loadInitialData()),
  onSetLog: (text) => dispatch(setLogs(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
