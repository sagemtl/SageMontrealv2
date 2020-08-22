import React, { useEffect, useState } from 'react';
import FooterDesktop from '../components/FooterDesktop';
import FooterMobile from '../components/FooterMobile';
import '../styles/footer.scss';

const Footer = ({ color }) => {
  const widthVal = typeof window !== `undefined` ? window.innerWidth : 800;
  const [width, setWidth] = useState(widthVal);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  if (width >= 500) {
    return <FooterDesktop color={color} />;
  }

  return <FooterMobile color={color} />;
};

export default Footer;
