import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import initialState from './initialState';
import globalReducer from './reducer';

const getCountry = async () => {
  const country = await fetch(
    `https://api.ipregistry.co/?key=${process.env.GATSBY_IP_REGISTRY_KEY}`,
  )
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem(
        'country',
        JSON.stringify(res.location.country.name),
      );
      return res.location.country.name;
    })
    .catch(() => {
      const defaultCountry = 'United States';
      localStorage.setItem('country', JSON.stringify(defaultCountry));
      return defaultCountry;
    });
  return country;
};

let localState;

if (typeof window !== `undefined`) {
  localState = JSON.parse(localStorage.getItem('cart-items'));
  if (localState && localState.version !== process.env.GATSBY_VERSION) {
    localStorage.clear();
    localState = null;
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
    const setDefaultCurrency = async () => {
      const countryLocalStorage = JSON.parse(localStorage.getItem('country'));
      let country;

      if (countryLocalStorage) {
        country = countryLocalStorage;
      } else {
        country = await getCountry();
      }

      if (country === 'Canada') {
        dispatch({
          type: 'SET_CURRENCY_CAD',
        });
      } else {
        dispatch({
          type: 'SET_CURRENCY_USD',
        });
      }
    };

    if (!state.currency) {
      setDefaultCurrency();
    }
  }, [state.currency]);

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
