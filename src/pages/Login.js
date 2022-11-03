import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail, actionCreator } from '../redux/actions';

class Login extends React.Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState(
      {
        [name]: value,
      },
      () => {
        const { email, password } = this.state;
        const minimumPassword = 6;
        const emailValidator = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

        if (emailValidator.test(email) && password.length >= minimumPassword) {
          this.setState({
            isDisabled: false,
          });
        } else {
          this.setState({
            isDisabled: true,
          });
        }
      },
    );
  };

  loginButton = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(actionCreator(userEmail, email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <>
        <div>Hello, TrybeWallet!</div>
        <div>Login</div>
        <form action="">
          <input
            type="email"
            name="email"
            id="email-input"
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
          />
          <br />
          <input
            type="password"
            name="password"
            id="password-input"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.handleChange }
            value={ password }
          />
          <br />
          <button
            type="button"
            onClick={ this.loginButton }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);
