import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreator, fetchedCurrencies } from '../redux/actions';
import fetchAPI from '../services/API';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;

    const data = await fetchAPI();
    delete data.USDT;
    const filteredCurrencies = Object.keys(data);
    console.log(filteredCurrencies);
    dispatch(actionCreator(fetchedCurrencies, filteredCurrencies));
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <form action="">
        <label htmlFor="valueInput">
          Valor:
          <input
            type="number"
            name="valueInput"
            id="valueInput"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="descriptionInput">
          Descrição:
          <input
            type="text"
            name="descriptionInput"
            id="descriptionInput"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currencyInput">
          Moeda:
          <select
            name="currencyInput"
            id="currencyInput"
            data-testid="currency-input"
          >
            {currencies.map((currency) => (
              <option key={ currency }>{ currency }</option>
            ))}
          </select>
        </label>

        <label htmlFor="methodInput">
          Método de Pagamento:
          <select
            name="methodInput"
            id="methodInput"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tagInput">
          <select
            name="tagInput"
            id="tagInput"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  // currencies: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies });

export default connect(mapStateToProps)(WalletForm);
