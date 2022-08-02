import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      currentSearch: '',
      isButtonDisabled: true,
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

  render() {
    const { isButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubimit } action="search-albums">
          <input
            type="text"
            name="currentSearch"
            placeholder="Procure por bandas ou artistas"
            onChange={ this.inputOnChange }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            disabled={ isButtonDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
