import React from 'react';
import Card from './Card';
import GenresButton from './GenresButton';
import axios from 'axios';
import { endpoints, getImageUrl } from '../config';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            genres: [],
            likedMovies: [],
        };
    }
    componentDidMount() {
        axios
            .get(endpoints.mostPopularMovies())
            .then((data) => {

                this.setState({
                    list: data.data.results,
                });
            });
        axios
            .get(endpoints.genres())
            .then((response) => {

                this.setState({
                    genres: response.data.genres,
                });
            });
    }

    getMoviesByGenre = (id) => {
        return axios
            .get(endpoints.genreMovies(id))
            .then((response) => {

                this.setState({
                    list: response.data.results,
                });
            });
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
                    {this.state.genres.map((genre) => (
                        <GenresButton
                            selectGenre={this.getMoviesByGenre}
                            genre={genre}
                        />
                    ))}
                </div>
                <div>
                {this.state.list ? this.state.list.map((card) => (
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

export default App;