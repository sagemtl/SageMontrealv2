import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import './styles/footer.scss';

const Footer = ({ color }) => {
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
