import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  redirectToSearch = () => {
    const { history, userName } = this.props;

    this.setState({ isLoading: true });

    createUser({ name: userName }).then(() => {
      history.push('/search');
    });
  };

  handleSubimit = (event) => {
    event.preventDefault();
  }

  render() {
    const { userName, inputOnChange, isDisabled } = this.props;
    const { isLoading } = this.state;

    return (
      <div data-testid="page-login">
        {
          isLoading ? (
            <div>
              <div className="loader" />
              Carregando...
            </div>
          )
            : (
              <form onSubmit={ this.handleSubimit }>
                <input
                  type="text"
                  name="userName"
                  placeholder="Digite seu nome de usuário"
                  value={ userName }
                  onChange={ inputOnChange }
                  data-testid="login-name-input"
                />
                <button
                  type="submit"
                  disabled={ isDisabled }
                  onClick={ this.redirectToSearch }
                  data-testid="login-submit-button"
                >
                  Entrar
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
