import React from 'react';

export default class GenresButton extends React.Component {
    selectGenre = () => {
        const { genre, selectGenre: select } = this.props;
        select(genre.id);
    };

    render() {
        const { genre } = this.props;

        return (
            <button onClick={this.selectGenre}>{genre.name}</button>
        );
    }
}