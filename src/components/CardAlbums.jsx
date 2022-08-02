import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardAlbums extends Component {
  render() {
    const { image, albumName, artistName } = this.props;

    return (
      <div>
        <img src={ image } alt={ `imagem do album: ${albumName}.` } />
        <p>{ albumName }</p>
        <p>{ artistName }</p>
      </div>
    );
  }
}

CardAlbums.propTypes = {
  image: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
