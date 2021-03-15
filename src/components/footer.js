import React, { useContext } from 'react';
import { GlobalContext } from '../context/Provider';

import PropTypes from 'prop-types';
import InstagramIcon from '@material-ui/icons/Instagram';
import './styles/footer.scss';

const Footer = ({ color }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const handleChangeCurrency = (newCur) => {
    if (newCur === 'CAD') {
      dispatch({
        type: 'SET_CURRENCY_CAD',
      });
    }
    else if (newCur === 'USD') {
      dispatch({
        type: 'SET_CURRENCY_USD',
      });
    }
  }

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
        <div className="footer-desktop__header" style={{ color }}>
          <select onChange={(e)=>handleChangeCurrency(e.target.value)} value={state.currency}>
            <option value='CAD'>🇨🇦&emsp;CAD</option>
            <option value='USD'>🇺🇸&emsp;USD</option>
          </select>
        </div>
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

Footer.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Footer;
