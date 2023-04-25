import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../Component/Carregando';

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onLoginButtonClick = async () => {
    const { name } = this.state;
    // await createUser({ name });
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      const { history } = this.props;
      history.push('/search');
    });
  };

  render() {
    const minCharacter = 3;
    const {
      name,
      loading,
    } = this.state;

    return (
      <div data-testid="page-login">
        { loading ? <Carregando /> : (
          <form>
            <label htmlFor="input-login">
              Login
              <input
                data-testid="login-name-input"
                type="text"
                name="name"
                id="input-login"
                placeholder="Name"
                onChange={ this.onInputChange }
                value={ name }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              onClick={ this.onLoginButtonClick }
              disabled={ name.length < minCharacter }
            >
              Entrar
            </button>
          </form>)}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
