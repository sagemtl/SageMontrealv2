import React from 'react';
import PropTypes from 'prop-types';
import InstagramIcon from '@material-ui/icons/Instagram';

const FooterDesktop = ({ color }) => {
  return (
    <div className="footer-desktop">
      <div className="footer-desktop-text">
        <h3 className="footer-desktop__header" style={{ color }}>
          © Sage Montreal 2020
        </h3>
        <a className="footer-desktop__link" style={{ color }} href="/contact">
          Contact Us
        </a>
        <a className="footer-desktop__link" style={{ color }} href="/terms">
          Terms & Conditions
        </a>
      </div>
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
  color: PropTypes.string.isRequired,
};

export default FooterDesktop;
