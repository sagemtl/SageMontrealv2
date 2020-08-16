import React from 'react';
import PropTypes from 'prop-types';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InstagramIcon from '@material-ui/icons/Instagram';

const FooterMobile = ({ pathname, buttonPaused, color, handleClick }) => {
  return (
    <div className="footer-mobile">
      {pathname === '/shop' && (
        <button
          type="button"
          className="footer-mobile__button"
          onClick={() => handleClick()}
        >
          {buttonPaused ? (
            <PlayArrowIcon />
          ) : (
            <PauseIcon style={{ verticalAlign: 'center' }} />
          )}
        </button>
      )}
      <div className="footer-mobile-row">
        <a className="footer-mobile__link" style={{ color }} href="/contact">
          Contact Us
        </a>
        <a className="footer-mobile__link" style={{ color }} href="/terms">
          Terms & Conditions
        </a>
        <a
          href="https://www.instagram.com/sagemtl/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-mobile__link"
        >
          <InstagramIcon className="footer-mobile__icon" style={{ color }} />
        </a>
      </div>
      <h3 className="footer-mobile__header" style={{ color }}>
        © Sage Montreal 2020
      </h3>
    </div>
  );
};

FooterMobile.propTypes = {
  buttonPaused: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FooterMobile;
