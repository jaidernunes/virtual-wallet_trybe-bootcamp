import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    return (
      <header>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">
          { expenses.reduce(
            (t, v) => t + Number(v.value * v.exchangeRates[v.currency].ask),
            0,
          ).toFixed(2)}
        </div>
        <div data-testid="header-currency-field">BRL</div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
