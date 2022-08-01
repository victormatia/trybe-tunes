import React, { Component } from 'react';
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
        {
          isLoading ? <span>Carregando...</span>
            : <span data-testid="header-user-name">{`Olá, ${userName}`}</span>
        }
      </header>
    );
  }
}
