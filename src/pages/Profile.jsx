import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getUser().then((response) => {
      this.setState({
        userName: response.name,
        userEmail: response.email,
        userImage: response.image,
        userDescription: response.description,
        isLoading: false,
      });
    });
  }

  render() {
    const { isLoading, userName, userEmail, userImage, userDescription } = this.state;

    return (
      <div data-testid="page-profile">
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
              <section>
                <img
                  src={ userImage }
                  alt={ `Foto de ${userName}` }
                  data-testid="profile-image"
                />
                <h4>Nome</h4>
                <p>{ userName }</p>
                <p>{ userName }</p>
                <h4>E-mail</h4>
                <p>{ userEmail }</p>
                <h4>Descrição</h4>
                <p>{ userDescription }</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </section>
            )
        }
      </div>
    );
  }
}
