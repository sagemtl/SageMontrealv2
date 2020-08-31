import React from 'react';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';
import '../styles/header.scss';
import { useLocation } from '@reach/router';


const Header = ({ setCart, cart }) => {
  return (
    <>
      <HeaderDesktop />
      <HeaderMobile setCart={setCart} cart={cart} />
    </>
  );
};

export default Header;
