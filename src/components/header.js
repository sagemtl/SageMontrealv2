import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Img from 'gatsby-image';
import './styles/header.scss';
import { GlobalContext } from '../context/Provider';

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

const Header = ({ siteTitle, current }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "sage-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

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
        className={navOpen ? 'header-button--closed' : 'header-button'}
        onClick={() => openNavbar(true)}
      >
        <p className="header-button__icon">开</p>
      </div>
      <div className={navOpen ? 'navbox' : 'navbox--closed'}>
        <header>
          <div onClick={() => openNavbar(false)}>
            <Img
              className="navbox__logo"
              fluid={data.placeholderImage.childImageSharp.fluid}
              alt={siteTitle}
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
