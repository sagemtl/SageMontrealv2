import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import './styles/header.scss';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { GlobalContext } from '../context/Provider';
import Test from '../../public/static/test.mp4';

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

const Header = ({ current }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { navOpen } = state;

  const [animated, setAnimated] = useState(false);

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
        className={navOpen ? 'header-button--closed' : 'header-button'}
        onClick={() => openNavbar(true)}
      >
        <ArrowForwardIosIcon className="header-button__icon" />
      </div>
      <div className={navOpen ? 'navbox' : 'navbox--closed'}>
        <header>
          <div
            onClick={() => openNavbar(false)}
            className="navbox-logo-wrapper"
          >
            <video
              src={Test}
              className="navbox__logo"
              muted
              playsInline
              loop
              onMouseOver={(e) => e.target.play()}
              onMouseOut={(e) => e.target.pause()}
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

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
};

export default Header;
