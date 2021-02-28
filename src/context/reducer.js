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
    case 'SET_NAVBAR_OPEN': {
      return {
        ...state,
        navOpen: action.payload.navOpen,
      };
    }
    case 'SET_SUCCESS_EMAIL': {
      return {
        ...state,
        successEmail: action.payload.successEmail,
      };
    }
    case 'SET_SUCCESS_ITEMS': {
      return {
        ...state,
        successItems: action.payload.successItems,
      };
    }
    case 'SET_VISITED_PAGE': {
      return {
        ...state,
        visitedPage: action.payload.visitedPage,
      };
    }
    default:
      return state;
  }
};

export default globalReducer;
