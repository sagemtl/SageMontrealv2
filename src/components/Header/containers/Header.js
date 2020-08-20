import React, { useEffect, useState } from 'react';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';
import '../styles/header.scss';

const Header = ({ current }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 800;
  const [width, setWidth] = useState(widthVal);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  if (width >= 900) {
    return <HeaderDesktop current={current} />;
  }

  return <HeaderMobile />;
};

export default Header;
