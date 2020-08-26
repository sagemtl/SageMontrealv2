import React from 'react';
import GlobalContextProvider from './src/context/Provider';
import './src/pages/styles/main.scss';

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
