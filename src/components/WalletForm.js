import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreator, fetchedCurrencies, addExpenseObj } from '../redux/actions';
import fetchAPI from '../services/API';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Alimentação',
    description: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;

    const data = await fetchAPI();
    delete data.USDT;
    const filteredCurrencies = Object.keys(data);

    dispatch(actionCreator(fetchedCurrencies, filteredCurrencies));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  addExpense = async () => {
    const { value, currency, method, tag, description } = this.state;
    const { dispatch, expenses } = this.props;

    // console.log(expenses.length);
    const data = await fetchAPI();
    // console.log(data);

    const expenseObj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    dispatch(actionCreator(addExpenseObj, expenseObj));

    this.setState({
      description: '',
      value: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <form action="">
        <label htmlFor="valueInput">
          Valor:
          <input
            type="number"
            name="value"
            id="valueInput"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="descriptionInput">
          Descrição:
          <input
            type="text"
            name="description"
            id="descriptionInput"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currencyInput">
          Moeda:
          <select
            name="currency"
            id="currencyInput"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {/* <option key="BRL">BRL</option> */}
            {currencies.map((curr) => (
              <option key={ curr }>{ curr }</option>
            ))}
          </select>
        </label>

        <label htmlFor="methodInput">
          Método de Pagamento:
          <select
            name="method"
            id="methodInput"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tagInput">
          Categoria:
          <select
            name="tag"
            id="tagInput"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.addExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
