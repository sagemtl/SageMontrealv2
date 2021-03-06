import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';

import { GlobalContext } from '../context/Provider';
import Header from './Header';
import Footer from './footer';
import Cart from './cart';
import './styles/layout.scss';

const Layout = ({ children, footerColor }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 0;
  const [width, setWidth] = useState(widthVal);
  const { pathname } = useLocation();
  const [cart, setCart] = useState(true);
  const { state } = useContext(GlobalContext);

  const cadFreeShipping = state.currency === 'CAD' ? '70' : '55';
  const usdFreeShipping = state.currency === 'CAD' ? '90' : '75';

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  const isMobile = width < 900;
  const bannerColor = pathname === '/shop' ? 'white' : 'black';

  return (
    <>
      {pathname !== '/checkout' && <Header setCart={setCart} cart={cart} />}
      {cart && pathname !== '/checkout' && <Cart isMobile={isMobile} />}
      <div className="layout">
        {pathname.includes('/shop') && (
          <div className="product-banner-wrapper">
            <div className="product-banner" style={{ color: bannerColor }}>
              <div className="product-banner-track">
                {[...Array(10)].map((val, ind) => {
                  return (
                    <div className="product-banner__div" key={ind.toString()}>
                      <p className="product-banner__entry">
                        Free shipping across Canada on orders above $
                        {cadFreeShipping}
                      </p>
                      <p className="product-banner__entry">
                        Free shipping in the US on orders above $
                        {usdFreeShipping}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
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
