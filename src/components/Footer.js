import React, { useContext } from 'react';
import { useLocation } from '@reach/router';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InstagramIcon from '@material-ui/icons/Instagram';
import { GlobalContext } from '../context/Provider';
import './styles/footer.scss';

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
    <div className="footer-desktop">
      <div className="footer-desktop-text">
        <h3 className="footer-desktop__header" style={{ color }}>
          © Sage Montreal {new Date().getFullYear()}
        </h3>
        <a className="footer-desktop__link" style={{ color }} href="/contact">
          Contact Us
        </a>
        <a className="footer-desktop__link" style={{ color }} href="/terms">
          Terms & Conditions
        </a>
      </div>
      {pathname === '/shop' && (
        <button
          type="button"
          className="footer-desktop__button"
          onClick={() => handleClick()}
        >
          {buttonPaused ? (
            <PlayArrowIcon />
          ) : (
            <PauseIcon style={{ verticalAlign: 'center' }} />
          )}
        </button>
      )}
      <a
        href="https://www.instagram.com/sagemtl/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon className="footer-desktop__icon" style={{ color }} />
      </a>
    </div>
  );
};

export default Footer;
