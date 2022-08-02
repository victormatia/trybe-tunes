import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      album: '',
      tracks: [],
      isFavorites: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id).then((data) => {
      this.setState({
        artist: data[0].artistName,
        album: data[0].collectionName,
        tracks: data.filter((obj) => obj.trackId),
      });
    });
  }

  getMusicByName = () => {
    const { tracks, isFavorites } = this.state;
    const name = Object.keys(isFavorites);
    return tracks.find((track) => track.trackName === name[0]);
  };

  saveFavorites = () => {
    const trackInfos = this.getMusicByName();

    this.setState({ isLoading: true });
    addSong(trackInfos).then(() => {
      this.setState({ isLoading: false });
    });
  }

  // handleChange = ({ target }) => {
  //   this.setState((prevState) => {
  //     const { isFavorites } = prevState;

  //     return { isFavorites: { ...isFavorites, [target.name]: target.checked } };
  //   });
  // }

  handleChange = ({ target }) => {
    this.setState({
      isFavorites: { [target.name]: target.checked },
    }, this.saveFavorites);
  }

  render() {
    const { artist, album, tracks, isLoading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artist }</h2>
        <h3 data-testid="album-name">{ album }</h3>
        { isLoading ? <span>Carregando...</span>
          : (
            tracks.map((track) => (
              <li key={ track.trackName }>
                <MusicCard
                  track={ track }
                  trackName={ track.trackName }
                  previewUrl={ track.previewUrl }
                  trackId={ track.trackId }
                  onInputChange={ this.handleChange }
                />
              </li>
            ))
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
