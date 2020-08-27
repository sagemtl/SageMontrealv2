import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GlobalContextProvider from '../context/Provider';
import Header from './Header';
import Footer from './footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children, footerColor, hideCart }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 0;
  const [width, setWidth] = useState(widthVal);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  const isMobile = width < 900;

  return (
    <GlobalContextProvider>
      <Header isMobile={isMobile} />
      {!hideCart && <Cart isMobile={isMobile} />}
      <div className="layout">{children}</div>
      <Footer color={footerColor} />
    </GlobalContextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideCart: PropTypes.bool,
  footerColor: PropTypes.string,
};

Layout.defaultProps = {
  hideCart: false,
  footerColor: 'black',
};

export default Layout;
