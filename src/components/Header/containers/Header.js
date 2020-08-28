import React from 'react';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';
import '../styles/header.scss';

const Header = () => {
  return (
    <>
      <HeaderDesktop />
      <HeaderMobile />
    </>
  );
};

export default Header;
