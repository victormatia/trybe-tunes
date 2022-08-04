import React, { Component } from 'react';
import Header from '../components/Header';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favoriteTracks: [],
      isFavorites: {},
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getFavoriteSongs().then((response) => {
      this.createFavoriteList(response);
      this.setState({
        favoriteTracks: response,
        isLoading: false,
      });
    });
  }

  createFavoriteList = (data) => {
    data.forEach((e) => {
      this.setState((prevState) => ({
        isFavorites: {
          ...prevState.isFavorites,
          [e.trackName]: true,
        },
      }));
    });
  }

  //

  getMusicByName = (name) => {
    const { favoriteTracks } = this.state;
    return favoriteTracks.find((track) => track.trackName === name);
  };

  removeFavorites = (name) => {
    const trackInfos = this.getMusicByName(name);

    this.setState({ isLoading: true });
    removeSong(trackInfos).then(() => {
      this.setState(() => {
        getFavoriteSongs().then((response) => {
          this.setState({
            favoriteTracks: response,
            isLoading: false,
          });
        });
      });
    });
  }

  handleChange = ({ target }) => {
    if (!target.checked) {
      this.removeFavorites(target.name);
    }
  }

  //

  render() {
    const { isLoading, favoriteTracks, isFavorites } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading ? (
            (
              <div>
                <div className="loader" />
                Carregando...
              </div>
            )
          )
            : (
              favoriteTracks.map((track) => (
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
              ))
            )
        }
      </div>
    );
  }
}
