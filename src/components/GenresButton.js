import React from 'react';
import { setLogs } from "../actions";
import { connect } from "react-redux";
import { getMoviesByGenre } from "../thunks";

class GenresButton extends React.Component {
    selectGenre = async () => {
      await this.props.onGetMoviesByGenre(this.props.genre.id);
      this.props.onSetLog(`Zanras pakeistas i ${this.props.genre.name}`);
    };

    render() {
      const { genre } = this.props;

      return (
        <button onClick={this.selectGenre}>{genre.name}</button>
      );
    }
}
const mapDispatchToProps = (dispatch) => ({
  onGetMoviesByGenre: (id) => dispatch(getMoviesByGenre(id)),
  onSetLog: (text) => dispatch(setLogs(text))
});

export default connect(
  null,
  mapDispatchToProps
)(GenresButton);