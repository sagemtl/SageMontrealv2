import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GlobalContextProvider from '../context/Provider';
import Header from './Header';
import Footer from './Footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 800;
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
      {!isMobile && <Cart isMobile={isMobile} />}
      <div className="layout">{children}</div>
      <Footer />
    </GlobalContextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
