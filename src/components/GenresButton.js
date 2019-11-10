import React from 'react';
import { setLogs } from "../actions";
import { connect } from "react-redux";

class GenresButton extends React.Component {
    selectGenre = () => {
        const { genre, selectGenre: select } = this.props;
        select(genre.id);
        this.props.onSetLog(`Zanras pakeistas i: ${genre.name}`);
    };

    render() {
        const { genre } = this.props;

        return (
            <button onClick={this.selectGenre}>{genre.name}</button>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    onSetLog: (text) => dispatch(setLogs(text))
});

export default connect(
    null,
    mapDispatchToProps
)(GenresButton);