import React, { useEffect, useState } from 'react';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';
import '../styles/header.scss';

const Header = ({ current }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  if (width >= 500) {
    return <HeaderDesktop current={current} />;
  }

  return <HeaderMobile />;
};

export default Header;
