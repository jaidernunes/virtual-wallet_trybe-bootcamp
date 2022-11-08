import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

describe('tests the Login component', () => {
  const pwInput = 'password-input';

  it('checks if there is an email text field', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByRole('textbox');

    expect(email).toBeInTheDocument();
  });

  it('checks if there is a password field', () => {
    renderWithRouterAndRedux(<Login />);
    const password = screen.getByTestId(pwInput);

    expect(password).toBeInTheDocument();
  });

  it('checks if there is a login button', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeInTheDocument();
  });

  it('checks if the login button starts disabled', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
  });

  it('checks if the login button enables when the fields are correctly filled', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'truemail2@gmail.com');
    userEvent.type(password, '123456');

    expect(button).not.toBeDisabled();
  });

  it('checks if the login button stays disabled when while receiving an invalid email', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'notreallyanemail');
    userEvent.type(password, '123456');

    expect(button).toBeDisabled();
  });

  it('checks if the login button stays disabled when while receiving an invalid password', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'truemail@gmail.com');
    userEvent.type(password, '12345');

    expect(button).toBeDisabled();
  });

  it('checks if clicking the login button redirects to the wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'truemail3@gmail.com');
    userEvent.type(password, '1234567');

    expect(history.location.pathname).toBe('/');

    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
