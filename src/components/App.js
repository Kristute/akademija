import React from 'react';
import { connect } from 'react-redux';
import { getMostPopularMovies, getGenre, getMoviesByGenre } from '../thunks';
import Card from './Card';
import GenresButton from './GenresButton';
import { getImageUrl } from '../config';

class App extends React.Component {
    componentDidMount() {
        this.props.onGetMostPopularMovies();
        this.props.onGetGenre();
    };

    getMoviesByGenre = (id) => {
        this.props.onGetMoviesByGenre(id);
    };

    render() {
        return (
            <div>
                <div>
                    {this.props.genres.map((genre) => (
                        <GenresButton
                            key={genre.id}
                            selectGenre={this.getMoviesByGenre}
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
    onGetMostPopularMovies: () => dispatch(getMostPopularMovies()),
    onGetGenre: () => dispatch(getGenre()),
    onGetMoviesByGenre: (id) => dispatch(getMoviesByGenre(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
