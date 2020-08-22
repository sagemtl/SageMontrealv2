import React from 'react';
import PropTypes from 'prop-types';
import InstagramIcon from '@material-ui/icons/Instagram';

const FooterMobile = ({ color }) => {
  return (
    <div className="footer-mobile">
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
  color: PropTypes.string.isRequired,
};

export default FooterMobile;
