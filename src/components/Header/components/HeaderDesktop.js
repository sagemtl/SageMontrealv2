import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { GlobalContext } from '../../../context/Provider';

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

const HeaderDesktop = ({ current }) => {
  const { state, dispatch } = useContext(GlobalContext);
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
    <>
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
        <header>
          <div
            role="button"
            tabIndex={0}
            onClick={() => openNavbar(false)}
            onKeyDown={() => openNavbar(false)}
            className="navbox-logo-wrapper"
          >
            <video
              src="https://res.cloudinary.com/sagemontreal-com/video/upload/v1596165122/Logo_vyryy9.mp4"
              className="navbox__logo"
              muted
              playsInline
              loop
              onMouseOver={(e) => e.target.play()}
              onFocus={(e) => e.target.play()}
              onMouseOut={(e) => e.target.pause()}
              onBlur={(e) => e.target.pause()}
            />
          </div>
        </header>
        {routes.map((route) => {
          return (
            <Link
              className={
                current === route.to ? 'navbox__selected' : 'navbox__link'
              }
              to={route.to}
            >
              <h2 className="navbox__text">{route.label}</h2>
            </Link>
          );
        })}
      </div>
    </>
  );
};

HeaderDesktop.propTypes = {
  current: PropTypes.string.isRequired,
};

export default HeaderDesktop;
