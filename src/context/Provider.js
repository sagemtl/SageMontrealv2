import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import initialState from './initialState';
import globalReducer from './reducer';

let localState;

if (typeof window !== `undefined`) {
  localState = JSON.parse(localStorage.getItem('cart-items'));
  if (localState) {
    localState.visitedPage = [];
  }
}

export const GlobalContext = createContext(initialState);

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    globalReducer,
    localState || initialState,
  );

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      localStorage.setItem('cart-items', JSON.stringify(state));
    }
  }, [state]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalContextProvider;
