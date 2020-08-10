import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InstagramIcon from '@material-ui/icons/Instagram';
import './styles/footer.scss';
import { GlobalContext } from '../context/Provider';

const Footer = ({ transparent, color }) => {
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
    <div className={transparent ? 'footer-transparent' : 'footer'}>
      <div className="footer-text">
        <h3 className="footer__header" style={{ color }}>
          © Sage Montreal 2020
        </h3>
        <a className="footer__link" style={{ color }} href="/contact">
          Contact Us
        </a>
        <a className="footer__link" style={{ color }} href="/terms">
          Terms & Conditions
        </a>
      </div>
      {pathname === '/shop' && (
        <button
          type="button"
          className="footer__button"
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
        <InstagramIcon className="footer__icon" style={{ color }} />
      </a>
    </div>
  );
};

Footer.propTypes = {
  transparent: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};

export default Footer;
