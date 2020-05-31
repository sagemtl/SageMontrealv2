const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHECKOUT_ITEMS': {
      return {
        ...state,
        checkoutItems: action.payload.checkoutItems,
      };
    }
    default:
      return state;
  }
};

export default globalReducer;
