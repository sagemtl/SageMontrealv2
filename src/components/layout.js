import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import HeaderMobile from './headerMobile';
import Footer from './footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children, current }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  return (
    <>
      {width >= 900 ? (
        <Header siteTitle={data.site.siteMetadata.title} current={current} />
      ) : (
        <HeaderMobile />
      )}
      <Cart />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  current: PropTypes.string.isRequired,
};

export default Layout;
