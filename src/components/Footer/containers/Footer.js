import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import FooterDesktop from '../components/FooterDesktop';
import FooterMobile from '../components/FooterMobile';
import { GlobalContext } from '../../../context/Provider';
import '../styles/footer.scss';

const Footer = ({ color }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { buttonPaused } = state;
  const { pathname } = useLocation();

  const widthVal = typeof window !== `undefined` ? window.innerWidth : 800;
  const [width, setWidth] = useState(widthVal);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
  }, []);

  const handleClick = () => {
    dispatch({
      type: 'SET_BUTTON_PAUSED',
      payload: {
        buttonPaused: !buttonPaused,
      },
    });
  };

  if (width >= 500) {
    return (
      <FooterDesktop
        pathname={pathname}
        color={color}
        buttonPaused={buttonPaused}
        handleClick={handleClick}
      />
    );
  }

  return (
    <FooterMobile
      pathname={pathname}
      color={color}
      buttonPaused={buttonPaused}
      handleClick={handleClick}
    />
  );
};

export default Footer;
