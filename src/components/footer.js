import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from '@reach/router';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InstagramIcon from '../images/instagram.svg';
import TumblrIcon from '../images/tumblr.svg';
import './styles/footer.scss';
import { GlobalContext } from '../context/Provider';

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { state, dispatch } = useContext(GlobalContext);
  const { buttonPaused } = state;
  const mobile = windowWidth < 1200;
  const { pathname } = useLocation();

  const handleClick = () => {
    dispatch({
      type: 'SET_BUTTON_PAUSED',
      payload: {
        buttonPaused: !buttonPaused,
      },
    });
  };

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, []);

  return (
    <div className="footer">
      <div className="footer-icons">
        <a
          href="https://www.instagram.com/sagemtl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={InstagramIcon} alt="Instagram" className="footer__icon" />
        </a>
        <a
          href="https://addmeonqq.tumblr.com/post/184841955797/amp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={TumblrIcon} alt="Tumblr" className="footer__icon" />
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
      <h3 className="footer__header">© Sage Montreal 2020</h3>
    </div>
  );
};

export default Footer;
