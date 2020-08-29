import React from 'react';
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

export default Header;
