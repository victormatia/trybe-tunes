import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardAlbums from '../components/CardAlbums';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      currentSearch: '',
      searchedArtist: '',
      isButtonDisabled: true,
      albums: [],
      message: '',
      wasFound: false,
    };
  }

  handleSubimit = (event) => {
    event.preventDefault();
  }

  enableButton = () => {
    this.setState((prevState) => {
      const { currentSearch } = prevState;
      const parameter = 2;
      const isTrue = currentSearch.length < parameter;
      return { isButtonDisabled: isTrue };
    });
  }

  inputOnChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.enableButton);
  }

  searchAlbums = () => {
    const { currentSearch } = this.state;
    searchAlbumsAPI(currentSearch).then((data) => {
      if (data.length === 0) {
        this.setState({ message: 'Nenhum álbum foi encontrado', wasFound: false });
      } else {
        this.setState({
          wasFound: true,
          searchedArtist: currentSearch,
          albums: data,
          currentSearch: '',
          message: '',
        });
      }
    });
  }

  render() {
    const {
      currentSearch,
      isButtonDisabled,
      albums, message,
      wasFound,
      searchedArtist,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubimit } action="search-albums">
          <input
            type="text"
            name="currentSearch"
            placeholder="Procure por bandas ou artistas"
            value={ currentSearch }
            onChange={ this.inputOnChange }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            disabled={ isButtonDisabled }
            onClick={ this.searchAlbums }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
        {
          wasFound ? <span>{`Resultado de álbuns de: ${searchedArtist}`}</span>
            : null
        }
        <section>
          {
            message.length > 0 ? <span>{ message }</span>
              : (albums.map((album) => (
                <Link
                  to={ `/album/${album.collectionId}` }
                  key={ album.collectionId }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <CardAlbums
                    image={ album.artworkUrl100 }
                    albumName={ album.collectionName }
                    artistName={ album.artistName }
                  />
                </Link>
              )))
          }
        </section>
      </div>
    );
  }
}
