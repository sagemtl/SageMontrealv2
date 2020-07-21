import React, { useContext, useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import './styles/headerMobile.scss';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import { GlobalContext } from '../context/Provider';

const HeaderMobile = ({ cart, setCart }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { navOpen } = state;
  const [position, setPosition] = useState('calc(100% / 4 * -2)');

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

  const openNavbar = () => {
    dispatch({
      type: 'SET_NAVBAR_OPEN',
      payload: {
        navOpen: !navOpen,
      },
    });
  };

  return (
    <div className="header-mobile">
      <div
        className="header-mobile-animated"
        style={navOpen ? { left: 0 } : { left: 'calc(100% / 4 * -2)' }}
      >
        <Link to="/shop" className="header-mobile__button">
          <StoreIcon fontSize="large" className="header-mobile__icon" />
        </Link>
        <Link to="/lookbook" className="header-mobile__button">
          <VisibilityIcon fontSize="large" className="header-mobile__icon" />
        </Link>
        <div
          className="header-mobile__logo-button"
          onClick={() => openNavbar()}
        >
          <Img
            className="header-mobile__logo"
            fluid={data.placeholderImage.childImageSharp.fluid}
          />
        </div>
      </div>
      <div className="header-mobile-cart" onClick={() => setCart(!cart)}>
        {cart ? (
          <CloseIcon fontSize="large" className="header-mobile__icon" />
        ) : (
          <ShoppingCartIcon fontSize="large" className="header-mobile__icon" />
        )}
      </div>
    </div>
  );
};

export default HeaderMobile;
