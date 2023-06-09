import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/MusicCard.css';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, onInputChange, isFavorites } = this.props;
    return (
      <div className="music">
        <span>{ trackName }</span>
        <audio
          className="player"
          src={ previewUrl }
          controls
          loop
          data-testid="audio-component"
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            id={ `checkbox-music-${trackId}` }
            name={ trackName }
            type="checkbox"
            checked={ isFavorites } // Pega o valor dinâmicamento do objeto isFavorites
            onChange={ onInputChange }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  isFavorites: PropTypes.bool.isRequired,
};
