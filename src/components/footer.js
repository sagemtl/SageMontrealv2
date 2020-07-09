import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InstagramIcon from '@material-ui/icons/Instagram';
import './styles/footer.scss';
import classNames from 'classnames';
import { GlobalContext } from '../context/Provider';

const Footer = ({ transparent, color }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { buttonPaused } = state;
  const { pathname } = useLocation();

  const iconClass = classNames({
    'footer__icon--dark': color === 'black',
    'footer__icon--light': color === 'white',
  });

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
      <a
        href="https://www.instagram.com/sagemtl/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon className={iconClass} />
      </a>
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
      <h3 className="footer__header">© Sage Montreal 2020</h3>
    </div>
  );
};

Footer.propTypes = {
  transparent: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};

export default Footer;
