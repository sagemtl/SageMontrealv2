import React from 'react';
import PropTypes from 'prop-types';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InstagramIcon from '@material-ui/icons/Instagram';

const FooterDesktop = ({ pathname, buttonPaused, color, handleClick }) => {
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

FooterDesktop.propTypes = {
  buttonPaused: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FooterDesktop;
