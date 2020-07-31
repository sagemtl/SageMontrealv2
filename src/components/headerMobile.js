import React, { useContext, useState, useRef } from 'react';
import { Link } from 'gatsby';
import './styles/headerMobile.scss';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import { GlobalContext } from '../context/Provider';

const HeaderMobile = ({ cart, setCart }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { navOpen } = state;

  const video = useRef();

  const openNavbar = () => {
    video.current.play();
    dispatch({
      type: 'SET_NAVBAR_OPEN',
      payload: {
        navOpen: !navOpen,
      },
    });
    setTimeout(() => video.current.pause(), 3000);
  };

  return (
    <div className="header-mobile">
      <div
        className="header-mobile-animated"
        style={navOpen ? { left: 0 } : { left: 'calc(100% / 4 * -2)' }}
      >
        <Link to="/shop" className="header-mobile__button">
          <StoreIcon fontSize="large" className="header-mobile__icon" />
        </Link>
        <Link to="/lookbook" className="header-mobile__button">
          <VisibilityIcon fontSize="large" className="header-mobile__icon" />
        </Link>
        <div
          className="header-mobile__logo-button"
          onClick={() => openNavbar()}
        >
          <video
            src="https://res.cloudinary.com/sagemontreal-com/video/upload/v1596165122/Logo_vyryy9.mp4"
            ref={video}
            className="header-mobile__logo"
            muted
            playsInline
            loop
          />
        </div>
      </div>
      <div className="header-mobile-cart" onClick={() => setCart(!cart)}>
        {cart ? (
          <CloseIcon fontSize="large" className="header-mobile__icon" />
        ) : (
          <ShoppingCartIcon fontSize="large" className="header-mobile__icon" />
        )}
      </div>
    </div>
  );
};

export default HeaderMobile;
