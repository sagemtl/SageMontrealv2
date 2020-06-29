const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHECKOUT_ITEMS': {
      return {
        ...state,
        checkoutItems: action.payload.checkoutItems,
      };
    }
    case 'SET_BUTTON_PAUSED': {
      return {
        ...state,
        buttonPaused: action.payload.buttonPaused,
      };
    }
    case 'RESET_CHECKOUT_ITEMS': {
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
