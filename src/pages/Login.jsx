import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../Component/Carregando';

class Login extends React.Component {
  state = {
    loginValue: '',
    isLoginButtonDisabled: true,
    loading: false,
  };

  validationFields = () => {
    const {
      loginValue,
    } = this.state;
    const minValue = 3;
    const valLogin = loginValue.length >= minValue;
    this.setState({
      isLoginButtonDisabled: !valLogin,
    });
  };

  onInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationFields);
  };

  onLoginButtonClick = () => {
    this.setState({ loading: true }, async () => {
      await createUser({ name: 'Name' });
      const { history } = this.props;
      history.push('/search');
    });
  };

  render() {
    const {
      loginValue,
      isLoginButtonDisabled,
      loading,
    } = this.state;

    return (
      <div data-test="page-login">
        { loading ? <Carregando /> : (
          <form data-testid="page-login">
            <label htmlFor="input-login">
              Login
              <input
                data-testid="login-name-input"
                type="text"
                name="loginValue"
                id="input-login"
                placeholder="Name"
                onChange={ this.onInputChange }
                value={ loginValue }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              onClick={ this.onLoginButtonClick }
              disabled={ isLoginButtonDisabled }
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
