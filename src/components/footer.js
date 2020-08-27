import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import classnames from 'classnames';
import './styles/footer.scss';

const Footer = () => {
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const getFooterStyles = () => {
    switch (url.split('/')[3]) {
      case 'lookbook':
        return { color: 'white' };
      case undefined:
        return { display: 'none' };
      default:
        return { color: 'black' };
    }
  };

  return (
    <div className="footer-desktop">
      <div className="footer-desktop-text">
        <h3 className="footer-desktop__header" style={getFooterStyles()}>
          © Sage Montreal {new Date().getFullYear()}
        </h3>
        <a
          className="footer-desktop__link"
          href="/contact"
          style={getFooterStyles()}
        >
          Contact Us
        </a>
        <a
          className="footer-desktop__link"
          href="/terms"
          style={getFooterStyles()}
        >
          Terms & Conditions
        </a>
      </div>
      <a
        href="https://www.instagram.com/sagemtl/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon
          className="footer-desktop__icon"
          style={getFooterStyles()}
        />
      </a>
    </div>
  );
};

export default Footer;
