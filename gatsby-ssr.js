const React = require('react');
const GlobalContextProvider = require('./src/context/Provider');

exports.wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
