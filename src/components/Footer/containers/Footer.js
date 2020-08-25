import React, { useContext } from 'react';
import { useLocation } from '@reach/router';
import FooterDesktop from '../components/FooterDesktop';
import { GlobalContext } from '../../../context/Provider';
import '../styles/footer.scss';

const Footer = ({ color }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { buttonPaused } = state;
  const { pathname } = useLocation();

  const handleClick = () => {
    dispatch({
      type: 'SET_BUTTON_PAUSED',
      payload: {
        buttonPaused: !buttonPaused,
      },
    });
  };

  return (
    <FooterDesktop
      pathname={pathname}
      color={color}
      buttonPaused={buttonPaused}
      handleClick={handleClick}
    />
  );
};

export default Footer;
