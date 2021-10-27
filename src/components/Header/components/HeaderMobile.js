import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import InstagramIcon from '@material-ui/icons/Instagram';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import { GlobalContext } from '../../../context/Provider';
import sageAnimated from '../../../assets/sage-animated.gif';
import shoppingBag from '../../../assets/shopping-bag.png';
import Currency from '../../currency';

const routes = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Boutique',
    to: '/shop',
  },
  {
    label: 'Lookbook',
    to: '/lookbook',
  },
  {
    label: 'Post-it Board',
    to: 'https://samcha.sagemontreal.com',
  }
];

const footerRoutes = [
  {
    label: 'Contact Us',
    to: '/contact',
  },
  {
    label: 'Terms & Conditions',
    to: '/terms',
  },
];

const HeaderMobile = ({ setCart, cart }) => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;
  const [open, setOpen] = useState(false);

  return (
    <div className="header-mobile">
      <Drawer open={open} onClose={() => setOpen(!open)}>
        <div className="header-mobile-drawer">
          {routes.map((route) => {
            return (
              <Link
                className="header-mobile__link"
                to={route.to}
                key={route.to}
              >
                <h2>{route.label}</h2>
              </Link>
            );
          })}
          <hr className="header-mobile__separator" />
          {footerRoutes.map((route) => {
            return (
              <Link
                className="header-mobile__footer-link"
                to={route.to}
                key={route.to}
              >
                <p>{route.label}</p>
              </Link>
            );
          })}
          <div className="header-mobile__currency">
            <Currency />
          </div>
          <a
            href="https://www.instagram.com/sagemtl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="header-mobile__icon" />
          </a>
        </div>
      </Drawer>
      <div
        role="button"
        tabIndex={0}
        className="header-mobile__logo-button"
        onClick={() => setOpen(true)}
        onKeyDown={() => setOpen(true)}
      >
        <img
          className="header-mobile__logo"
          src={sageAnimated}
          alt="Sage Mobile Logo"
        />
      </div>
      <div
        className="header-mobile-cart"
        role="button"
        tabIndex={-1}
        onClick={() => setCart(!cart)}
        onKeyDown={() => setCart(!cart)}
      >
        {cart && checkoutItems.length > 0 ? (
          <CloseIcon
            fontSize="large"
            className="header-mobile__icon"
            style={{ marginRight: 15 }}
          />
        ) : (
          <img
            className="header-mobile__cart"
            src={shoppingBag}
            alt="Sage Shopping Bag"
          />
        )}
      </div>
    </div>
  );
};

HeaderMobile.propTypes = {
  setCart: PropTypes.func.isRequired,
  cart: PropTypes.bool.isRequired,
};

export default HeaderMobile;
