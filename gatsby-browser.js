import React from 'react';
import GlobalContextProvider from './src/context/Provider';
import './src/components/styles/layout.scss';
import './src/pages/styles/index.scss';

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
