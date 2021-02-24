import { Link } from 'gatsby';
import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useLocation } from '@reach/router';
import { GlobalContext } from '../../../context/Provider';
import sageAnimated from '../../../assets/sage-animated.gif';

const routes = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Boutique',
    to: '/shop',
  },
  {
    label: 'Lookbook',
    to: '/lookbook',
  },
];

const HeaderDesktop = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const { navOpen } = state;

  const openNavbar = (open) => {
    dispatch({
      type: 'SET_NAVBAR_OPEN',
      payload: {
        navOpen: open,
      },
    });
  };

  return (
    <div className="header-desktop">
      <div
        role="button"
        tabIndex={0}
        className={navOpen ? 'header-button--closed' : 'header-button'}
        onClick={() => openNavbar(true)}
        onKeyDown={() => openNavbar(true)}
      >
        <ArrowForwardIosIcon className="header-button__icon" />
      </div>
      <div className={navOpen ? 'navbox' : 'navbox--closed'}>
        <IconButton
          aria-label="close"
          className="header-desktop__close"
          size="small"
          onClick={() => openNavbar(false)}
          onKeyDown={() => openNavbar(false)}
        >
          <HighlightOffIcon fontSize="small" className="header-desktop__icon" />
        </IconButton>
        <a
          tabIndex={-1}
          onClick={() => openNavbar(false)}
          onKeyDown={() => openNavbar(false)}
          className="navbox-logo-wrapper"
          href="/"
        >
          <video
            src="https://res.cloudinary.com/sagemontreal-com/video/upload/v1596165122/Logo_vyryy9.mp4"
            poster={sageAnimated}
            className="navbox__logo"
            muted
            playsInline
            loop
            onMouseOver={(e) => e.target.play()}
            onFocus={(e) => e.target.play()}
            onMouseOut={(e) => e.target.pause()}
            onBlur={(e) => e.target.pause()}
          />
        </a>
        {routes.map((route) => {
          return (
            <Link
              className={
                (route.to !== '/' && pathname.includes(route.to)) ||
                (route.to === '/' && pathname === '/')
                  ? 'navbox__selected'
                  : 'navbox__link'
              }
              to={route.to}
              key={route.to}
            >
              <h2 className="navbox__text">{route.label}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderDesktop;
