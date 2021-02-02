import React from 'react';
import PropTypes from 'prop-types';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';
import '../styles/header.scss';

const Header = ({ setCart, cart }) => {
  return (
    <>
      <HeaderDesktop />
      <HeaderMobile setCart={setCart} cart={cart} />
    </>
  );
};

Header.propTypes = {
  setCart: PropTypes.func.isRequired,
  cart: PropTypes.bool.isRequired,
};

export default Header;
