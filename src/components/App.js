import React from 'react';
import { connect } from 'react-redux';
import {getMostPopularMovies, getGenre, getMoviesByGenre} from '../thunks';
import Card from './Card';
import GenresButton from './GenresButton';
import { getImageUrl } from '../config';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            likedMovies: [],
        };
    }
    componentDidMount() {
        this.props.onGetMostPopularMovies();
        this.props.onGetGenre();
    }

    getMoviesByGenre = (id) => {
        this.props.onGetMoviesByGenre(id);
    }

    likeMovie = (id) => {
        const { likedMovies } = this.state;

        if(likedMovies.findIndex((likedId) => likedId === id) === -1) {
            this.setState({ likedMovies: [...likedMovies, id] })
        }
    }

    isMovieLiked = (id) => this.state.likedMovies.findIndex((likedId) => likedId === id) !== -1;

    dislikeMovie = (id) => {
        const { likedMovies } = this.state;
        const copyOfLikedMovies = [...likedMovies];
        const indexOfLikedMovieId = likedMovies.findIndex((likedId) => likedId === id);

        if(indexOfLikedMovieId !== -1) {
            copyOfLikedMovies.splice(indexOfLikedMovieId, 1)
            this.setState({ likedMovies: copyOfLikedMovies })
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.genres.map((genre) => (
                        <GenresButton
                            selectGenre={this.getMoviesByGenre}
                            genre={genre}
                        />
                    ))}
                </div>
                <div>
                {this.props.mostPopularMovies ? this.props.mostPopularMovies.map((card) => (
                    <Card
                        key={card.original_title}
                        backgroundImage={getImageUrl(card.backdrop_path)}
                        date={card.release_date}
                        rating={card.vote_average}
                        votes={card.vote_count}
                        description={card.overview}
                        title={card.original_title}
                        id={card.id}
                        likeMovie={this.likeMovie}
                        likedMovie={this.isMovieLiked(card.id)}
                        dislikeMovie={this.dislikeMovie}
                    />
                    ))
                    : <div>loading</div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    showCards: state.componentState.showCards,
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
