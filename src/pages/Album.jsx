import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      album: '',
      tracks: [],
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

  render() {
    const { artist, album, tracks } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artist }</h2>
        <h3 data-testid="album-name">{ album }</h3>
        {
          tracks.map((track) => (
            <li key={ track.trackName }>
              <MusicCard
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
              />
            </li>
          ))
        }
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
