import React from 'react';
import GlobalContextProvider from './src/context/Provider';

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
