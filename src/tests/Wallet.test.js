import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('tests the Wallet component', () => {
  const validEmail = 'validemail@gmail.com';
  const validPassword = '123456';
  const pwInput = 'password-input';

  // mock code from https://stackoverflow.com/questions/62405645/how-to-mock-fetch-when-testing-a-react-app
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('checks if all the required form fields are rendered', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(button);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addExpButton = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addExpButton).toBeInTheDocument();
  });

  it('checks if the API is called on component load', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(button);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('checks if the API is called when adding a expense', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(button);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const addExpButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.click(addExpButton);

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('checks if the sum of new expenses is correctly displayed', async () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(button);

    const addExpButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const valueInput = screen.getByTestId('value-input');

    userEvent.type(valueInput, '1');
    userEvent.click(addExpButton);
    userEvent.type(valueInput, '1');
    userEvent.click(addExpButton);
    const totalDisplay = await screen.findByText('57.04');

    expect(totalDisplay).toBeInTheDocument();
  });

  it('checks if its possible to edit the expense description', async () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(button);

    const addExpButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addExpButton);

    const editExp = await screen.findByText('Editar');
    userEvent.click(editExp);

    const descInput = screen.getByTestId('description-input');
    userEvent.type(descInput, 'test');

    const editExpButton = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(editExpButton);

    const testDesc = await screen.findByText('test');
    expect(testDesc).toBeInTheDocument();
  });

  it('checks if its possible to delete an expense', async () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId(pwInput);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(button);

    const addExpButton = screen.getByRole('button', { name: /adicionar despesa/i });
    // const descInput = screen.getByTestId('description-input');
    // userEvent.type(descInput, 'test');
    userEvent.click(addExpButton);

    // const testDesc = await screen.findByText('test');
    const deleteExp = await screen.findByText('Excluir');
    expect(deleteExp).toBeInTheDocument();
    userEvent.click(deleteExp);
    expect(deleteExp).not.toBeInTheDocument();
  });
});
