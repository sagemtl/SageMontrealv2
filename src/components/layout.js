import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children, footerColor, hideCart, style }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 800;
  const [width, setWidth] = useState(widthVal);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  const isMobile = width < 900;

  return (
    <>
      <Header isMobile={isMobile} />
      {!isMobile && !hideCart && <Cart isMobile={isMobile} />}
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
  current: PropTypes.string.isRequired,
};

Layout.defaultProps = {
  hideCart: false,
  footerColor: 'black',
  style: {},
};

export default Layout;
