import React from 'react';
import InstagramIcon from '../images/instagram.svg';
import TumblrIcon from '../images/tumblr.svg';
import './styles/footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <a href="https://www.instagram.com/sagemtl/" target="_blank">
          <img src={InstagramIcon} alt="Instagram" className="footer__icon" />
        </a>
        <a href="https://addmeonqq.tumblr.com/post/184841955797/amp" target="_blank">
          <img src={TumblrIcon} alt="Tumblr" className="footer__icon" />
        </a>
      </div>
      <h3 className="footer__header">© Sage Montreal 2020</h3>
    </div>
  );
};

export default Footer;
