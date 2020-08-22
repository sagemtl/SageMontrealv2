import React, { useEffect, useState } from 'react';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';
import '../styles/header.scss';

const Header = ({ current }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 0;
  const [width, setWidth] = useState(widthVal);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  return (
    <>
      <HeaderDesktop current={current} display={width >= 900} />
      <HeaderMobile display={width >= 900} />
    </>
  );
};

export default Header;
