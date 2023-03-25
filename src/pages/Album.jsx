import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../css/Album.css';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      album: {
        name: '',
        thumbnail: '',
      },
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
        album: {
          name: data[0].collectionName,
          thumbnail: data[0].artworkUrl100,
        },
        tracks: data.filter((obj) => obj.trackId),
      });
    });

    getFavoriteSongs().then((response) => {
      response.forEach((track) => {
        this.setState((prevState) => ({
          isFavorites: { ...prevState.isFavorites, [track.trackName]: true },
        }));
      });
    });
  }

  getMusicByName = (name) => {
    const { tracks } = this.state;
    return tracks.find((track) => track.trackName === name);
  };

  saveFavorites = (name) => {
    const trackInfos = this.getMusicByName(name);

    this.setState({ isLoading: true });
    addSong(trackInfos).then(() => {
      this.setState({ isLoading: false });
    });
  }

  removeFavorites = (name) => {
    const trackInfos = this.getMusicByName(name);

    this.setState({ isLoading: true });
    removeSong(trackInfos).then(() => {
      this.setState({ isLoading: false });
    });
  }

  handleChange = ({ target }) => {
    if (target.checked) {
      this.setState((prevState) => {
        const { isFavorites } = prevState;
        return { isFavorites: { ...isFavorites, [target.name]: target.checked } };
      });

      this.saveFavorites(target.name);
    } else {
      this.setState((prevState) => {
        const { isFavorites } = prevState;
        return { isFavorites: { ...isFavorites, [target.name]: target.checked } };
      });

      this.removeFavorites(target.name);
    }
  }

  render() {
    const { artist, album, tracks, isLoading, isFavorites } = this.state;
    const coverResize = album.thumbnail.replace('100x100bb', '1000x1000bb');
    return (
      <main className="album" data-testid="page-album">
        <Header />
        <section
          className="albumScreen"
          style={ {
            background: `url(${coverResize})`,
          } }
        >
          <div className="blur" />
          <section className="infoMusicAlbums">
            <img src={ coverResize } alt="a" />
            <h2 data-testid="artist-name">{ artist }</h2>
            <h3 data-testid="album-name">{ album.name }</h3>
          </section>
          { isLoading ? (
            (
              <div className="loginScreen">
                <div className="loader" />
                Carregando...
              </div>
            )
          )
            : (
              <section className="musics">
                <div>
                  {tracks.map((track) => (
                    <li key={ track.trackName }>
                      <MusicCard
                        track={ track }
                        trackName={ track.trackName }
                        previewUrl={ track.previewUrl }
                        trackId={ track.trackId }
                        onInputChange={ this.handleChange }
                        isFavorites={ !!isFavorites[track.trackName] } // fix-auto do lint para 'isFavorites[track.trackName] ? true : false'
                      />
                    </li>
                  ))}
                </div>
              </section>
            )}
        </section>
      </main>
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
