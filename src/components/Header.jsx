import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import userIcon from '../images/user-icon.png';
import '../css/Header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userImage: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getUser().then((response) => {
      if (response.image.length === 0) {
        this.setState({
          userName: response.name,
          userImage: userIcon,
          isLoading: false,
        });
      } else {
        this.setState({
          userName: response.name,
          userImage: response.image,
          isLoading: false,
        });
      }
    });
  }

  render() {
    const { userName, isLoading, userImage } = this.state;

    return (
      <header data-testid="header-component">
        <div>
          {
            isLoading ? <span>Carregando...</span>
              : (
                <div
                  className="cardUser"
                  data-testid="header-user-name"
                >
                  <img
                    className="imageCardUser"
                    src={ userImage }
                    alt="F"
                  />
                  { userName }
                </div>
              )
          }
        </div>
        <nav>
          <Link
            className="link-nav"
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisa
          </Link>
          <Link
            className="link-nav"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritas
          </Link>
          <Link
            className="link-nav"
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
          <Link
            className="link-nav"
            to="/"
          >
            Logout
          </Link>
        </nav>
      </header>
    );
  }
}
