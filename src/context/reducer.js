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
    case 'SET_AUDIO_PAUSED': {
      return {
        ...state,
        audioPaused: action.payload.audioPaused,
      };
    }
    case 'SET_AUDIO': {
      return {
        ...state,
        audio: action.payload.audio,
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
    default:
      return state;
  }
};

export default globalReducer;
