import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isButtonDesabled: true,
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

  validateInputs = () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const validadeCharacters = userEmail.includes('@') && userEmail.includes('.com');
    const validateEmail = validadeCharacters && userEmail.length > 0;
    const validateDescription = userDescription.length > 0;
    const validateImage = userImage.length > 0;
    const validateName = userName.length > 0;

    if (validateEmail && validateDescription && validateImage && validateName) {
      this.setState({ isButtonDesabled: false });
    } else {
      this.setState({ isButtonDesabled: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.validateInputs);
  }

  handleClick = () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    updateUser({
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    }).then(() => {
      this.setState({ isLoading: false });
      history.push('/profile');
    });
  }

  render() {
    const { isLoading, userName, userEmail, userDescription, userImage,
      isButtonDesabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
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
                <p>Editar perfil</p>
                <form onSubmit={ this.handleSubmit }>
                  <label htmlFor="editName">
                    Editar nome de usuário
                    <input
                      type="text"
                      name="userName"
                      value={ userName }
                      placeholder="Adicione um nome de usuário"
                      onChange={ this.handleChange }
                      data-testid="edit-input-name"
                    />
                  </label>
                  <label htmlFor="editEmail">
                    Editar e-mail
                    <input
                      type="text"
                      name="userEmail"
                      value={ userEmail }
                      placeholder="Adicione um e-mail"
                      onChange={ this.handleChange }
                      data-testid="edit-input-email"
                    />
                  </label>
                  <label htmlFor="userDescription">
                    Editar descrição
                    <textarea
                      name="userDescription"
                      value={ userDescription }
                      placeholder="Adicione uma descrição"
                      onChange={ this.handleChange }
                      cols="30"
                      rows="10"
                      data-testid="edit-input-description"
                    />
                  </label>
                  <label htmlFor="editName">
                    Editar foto de perfil
                    <input
                      type="text"
                      name="userImage"
                      value={ userImage }
                      placeholder="Adicione um foto de perfil"
                      onChange={ this.handleChange }
                      data-testid="edit-input-image"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={ isButtonDesabled }
                    onClick={ this.handleClick }
                    data-testid="edit-button-save"
                  >
                    Salvar alterções
                  </button>
                </form>
              </section>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
