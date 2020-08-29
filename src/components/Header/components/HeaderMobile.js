import React, { useState } from 'react';
import { Link } from 'gatsby';
import InstagramIcon from '@material-ui/icons/Instagram';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';

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
  const [open, setOpen] = useState(false);

  return (
    <div className="header-mobile">
      <Drawer open={open} onClose={() => setOpen(!open)}>
        <div className="header-mobile-drawer">
          {routes.map((route) => {
            return (
              <Link className="header-mobile__link" to={route.to}>
                <h2>{route.label}</h2>
              </Link>
            );
          })}
          <hr className="header-mobile__separator" />
          {footerRoutes.map((route) => {
            return (
              <Link className="header-mobile__footer-link" to={route.to}>
                <p>{route.label}</p>
              </Link>
            );
          })}
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
          src="https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-animated.gif"
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
        {cart ? (
          <CloseIcon
            fontSize="large"
            className="header-mobile__icon"
            style={{ 'margin-right': 15 }}
          />
        ) : (
          <img
            className="header-mobile__cart"
            src="https://sageimagebank.s3.ca-central-1.amazonaws.com/shopping-bag.png"
            alt="Sage Shopping Bag"
          />
        )}
      </div>
    </div>
  );
};

export default HeaderMobile;
