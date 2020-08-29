import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children, footerColor, hideCart, style }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 0;
  const [width, setWidth] = useState(widthVal);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  const isMobile = width < 900;

  return (
    <>
      <Header />
      {!hideCart && <Cart isMobile={isMobile} />}
      <div className="layout" style={style}>
        {children}
      </div>
      <Footer color={footerColor} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hideCart: PropTypes.bool,
  footerColor: PropTypes.string,
  style: PropTypes.shape,
};

Layout.defaultProps = {
  hideCart: false,
  footerColor: 'black',
  style: {},
};

export default Layout;
