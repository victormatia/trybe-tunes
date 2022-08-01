import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getUser().then((response) => {
      this.setState({ userName: response.name, isLoading: false });
    });
  }

  render() {
    const { userName, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        <div>
          {
            isLoading ? <span>Carregando...</span>
              : <span data-testid="header-user-name">{`Olá, ${userName}`}</span>
          }
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}
