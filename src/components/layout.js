import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children, footerColor }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 0;
  const [width, setWidth] = useState(widthVal);
  const [cart, setCart] = useState(true);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  const isMobile = width < 900;

  return (
    <>
      <Header setCart={setCart} cart={cart} />
      {cart && <Cart isMobile={isMobile} />}
      <div className="layout">{children}</div>
      <Footer color={footerColor} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  footerColor: PropTypes.string,
};

Layout.defaultProps = {
  footerColor: 'black',
};

export default Layout;
