import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardAlbums from '../components/CardAlbums';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/Search.css';
import Footer from '../components/Footer';

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
      <main data-testid="page-search">
        <Header />
        <section className="hero">
          <h1>O que você quer ouvir hoje?</h1>
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
        </section>

        {
          wasFound ? (
            <p
              className="span-result"
            >
              {`Resultado de álbuns de: ${searchedArtist}`}
            </p>
          )
            : null
        }
        <section className="cardsAlbums">
          {
            message.length > 0 ? <span>{ message }</span>
              : (albums.map((album) => {
                const coverResize = album
                  .artworkUrl100.replace('100x100bb', '1000x1000bb');

                return (
                  <Link
                    to={ `/album/${album.collectionId}` }
                    key={ album.collectionId }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <CardAlbums
                      image={ coverResize }
                      albumName={ album.collectionName }
                      artistName={ album.artistName }
                    />
                  </Link>
                );
              }))
          }
        </section>
        <Footer albums={ albums } />
      </main>
    );
  }
}
