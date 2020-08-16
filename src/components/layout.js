import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children, footerColor, hideCart, style, current }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  const isMobile = width < 900;

  return (
    <>
      <Header current={current} />
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
};

Layout.defaultProps = {
  hideCart: false,
  footerColor: 'black',
  style: {},
};

export default Layout;
