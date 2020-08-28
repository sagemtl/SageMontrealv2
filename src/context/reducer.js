const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHECKOUT_ITEMS': {
      return {
        ...state,
        checkoutItems: action.payload.checkoutItems,
      };
    }
    case 'RESET_CHECKOUT_ITEMS': {
      return {
        ...state,
        checkoutItems: action.payload.checkoutItems,
      };
    }
    case 'SET_NAVBAR_OPEN': {
      return {
        ...state,
        navOpen: action.payload.navOpen,
      };
    }
    default:
      return state;
  }
};

export default globalReducer;
