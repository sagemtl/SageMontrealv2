import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';

import Header from './Header';
import Footer from './footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children, footerColor, hideCart, style }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 0;
  const [width, setWidth] = useState(widthVal);
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  const isMobile = width < 900;

  return (
    <>
      {pathname !== '/checkout' && <Header isMobile={isMobile} />}
      {!hideCart && pathname !== '/checkout' && <Cart isMobile={isMobile} />}
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
