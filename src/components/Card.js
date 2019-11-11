import React from 'react';
import { setDislikeMovie, setLikeMovie, setLogs } from "../actions";
import { connect } from "react-redux";

class Card extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showDescription: true,
    };
  }

  isMovieLiked = () => this.props.likedMovies.findIndex((likedId) => likedId === this.props.id) !== -1;

  likeMovie = async () => {
    if(this.props.likedMovies.findIndex((likedId) => likedId === this.props.id) === -1) {
      await this.props.onSetLikeMovie(this.props.id);
      this.props.onSetLog(`Uzdeta siredele filmui ${this.props.title}`);
    }
  };

  dislikeMovie = async () => {
    await this.props.onSetDislikeMovie(this.props.id);
    this.props.onSetLog(`Nuimta siredele filmui ${this.props.title}`);
  };
  
  render() {
    const { showDescription } = this.state;
    const { title, backgroundImage, date, rating, votes, description } = this.props;
    return (
      <div className="card">
        <div
          className="card__image"
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}/>
      
        <div className="card__title">
          {title}
        </div>
      
        <div className="card__like">
          <i className="fa fa-heart-o" />
        </div>
      
        <div className="card__subtitle">
          <span>{date}</span>
          <span>{rating} ({votes} votes)</span>
        </div>
      
        <div className="card-info">
          <div className="card-info__header">Summary</div>
          <button onClick={() => { this.setState({ showDescription: !showDescription })}}>Toggle</button>
          {!this.isMovieLiked() ? (
            <button onClick={this.likeMovie}>Širdutė</button>
          )
            : (
              <button onClick={this.dislikeMovie}>Nebemėgti</button>
            )}
          <div className="card-info__description">
            {showDescription ? description : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  likedMovies: state.likeMovie.likedMovies,
});
const mapDispatchToProps = (dispatch) => ({
  onSetLikeMovie: (movieID) => dispatch(setLikeMovie(movieID)),
  onSetDislikeMovie: (movieID) => dispatch(setDislikeMovie(movieID)),
  onSetLog: (text) => dispatch(setLogs(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);
