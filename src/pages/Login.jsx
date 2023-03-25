import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import art from '../images/art.png';
import '../css/Login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isDisabled: true,
      isLoading: false,
    };
  }

  handleSubimit = (event) => {
    event.preventDefault();
  }

  enableButton = () => {
    this.setState((prevState) => {
      const { userName } = prevState;
      const parameter = 3;
      const isTrue = userName.length < parameter;
      return { isDisabled: isTrue };
    });
  }

  inputOnChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.enableButton);
  }

  redirectToSearch = () => {
    const { history } = this.props;
    const { userName } = this.state;

    this.setState({ isLoading: true });

    createUser({ name: userName }).then(() => {
      history.push('/search');
    });
  };

  render() {
    const { userName, isDisabled, isLoading } = this.state;

    return (
      <div data-testid="page-login">
        {
          isLoading ? (
            <div className="loadingScreen">
              <div className="loader" />
              Carregando...
            </div>
          )
            : (
              <section className="loginScreen">
                <section className="leftSide">
                  <h1>
                    Trybe
                    <br />
                    <span>tunes</span>
                  </h1>
                  <form onSubmit={ this.handleSubimit }>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Digite seu nome de usuário"
                      value={ userName }
                      onChange={ this.inputOnChange }
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
                </section>
                <section className="rigthSide">
                  <img src={ art } alt="art" />
                </section>
              </section>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
