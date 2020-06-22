import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import HeaderMobile from './headerMobile';
import Footer from './footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children, current, footerTransparent, hideCart }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [cart, setCart] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  const isMobile = width < 900;

  return (
    <>
      {isMobile ? (
        <HeaderMobile setCart={setCart} cart={cart} />
      ) : (
        <Header siteTitle={data.site.siteMetadata.title} current={current} />
      )}
      {(!isMobile || cart) && !hideCart && <Cart isMobile={isMobile} />}
      <div className="layout">{children}</div>
      <Footer transparent={footerTransparent} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  current: PropTypes.string.isRequired,
  footerTransparent: PropTypes.bool,
  hideCart: PropTypes.bool,
};

Layout.defaultProps = {
  footerTransparent: false,
  hideCart: false,
};

export default Layout;
