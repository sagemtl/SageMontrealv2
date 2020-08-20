const React = require('react');
const GlobalContextProvider = require('./src/context/Provider').default;

exports.wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
