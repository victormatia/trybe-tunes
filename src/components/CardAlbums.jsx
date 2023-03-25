import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardAlbums extends Component {
  render() {
    const { image, albumName, artistName } = this.props;

    return (
      <div className="cardAlbum">
        <img src={ image } alt={ `imagem do album: ${albumName}.` } />
        <div className="info-music">
          <p>{ albumName }</p>
          <div className="divisor" />
          <p>{ artistName }</p>
        </div>
      </div>
    );
  }
}

CardAlbums.propTypes = {
  image: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
