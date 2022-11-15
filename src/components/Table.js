import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreator, deleteExpenseObj, editExpenseObj } from '../redux/actions';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { dispatch, expenses } = this.props;
    const idToDelete = Number(target.id);
    console.log(idToDelete);
    // console.log(expenses);

    // const expenseArr = expenses.splice(idToDelete, 1);
    // delete expenses[idToDelete];
    const expenseArr = expenses.filter((expense) => (expense.id !== idToDelete));

    console.log(expenseArr);

    dispatch(actionCreator(deleteExpenseObj, expenseArr));
  };

  editExpense = ({ target }) => {
    const { dispatch } = this.props;
    // const idToDelete = Number(target.id);
    const idForEdit = Number(target.id);
    console.log(idForEdit);
    dispatch(actionCreator(editExpenseObj, idForEdit));
    // console.log(expenses);

    // const expenseArr = expenses.splice(idToDelete, 1);
    // delete expenses[idToDelete];
    // const expenseArr = expenses.filter((expense) => (expense.id !== idToDelete));

    // console.log(expenseArr);
  };

  render() {
    const { expenses } = this.props;
    // console.log(expenses);

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ expense.currency }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                { Number(
                  expense.value * expense.exchangeRates[expense.currency].ask,
                ).toFixed(2) }
              </td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  id={ expense.id }
                  onClick={ this.deleteExpense }
                >
                  Excluir
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  id={ expense.id }
                  onClick={ this.editExpense }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  // currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  // editor: PropTypes.bool.isRequired,
  // idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  // currencies: wallet.currencies,
  expenses: wallet.expenses,
  // editor: wallet.editor,
  // idToEdit: wallet.idToEdit,
});

export default connect(mapStateToProps)(Table);
