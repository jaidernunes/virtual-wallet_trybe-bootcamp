// Coloque aqui suas actions
export const userEmail = 'userEmail';
export const fetchedCurrencies = 'fetchedCurrencies';
export const addExpenseObj = 'addExpenseObj';
export const deleteExpenseObj = 'deleteExpenseObj';
export const editExpenseObj = 'editExpenseObj';
export const addEditedExpenseObj = 'addEditedExpenseObj';

export const actionCreator = (type, payload) => ({
  type,
  payload,
});
