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
    default:
      return state;
  }
};

export default globalReducer;
