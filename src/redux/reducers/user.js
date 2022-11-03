// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialUser = {
  email: '',
};

const emailReducer = (state = initialUser, action) => {
  switch (action.type) {
  case 'userEmail':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default emailReducer;
