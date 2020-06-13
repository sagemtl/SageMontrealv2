import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import './styles/headerMobile.scss';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';

const HeaderMobile = ({ cart, setCart }) => {
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

  return (
    <div className="header-mobile">
      <Link to="/">
        <Img
          className="header-mobile__logo"
          fluid={data.placeholderImage.childImageSharp.fluid}
        />
      </Link>
      <Link to="/shop" className="header-mobile__button">
        <StoreIcon fontSize="large" className="header-mobile__icon" />
      </Link>
      <Link to="/lookbook" className="header-mobile__button">
        <VisibilityIcon fontSize="large" className="header-mobile__icon" />
      </Link>
      <div className="header-mobile__button" onClick={() => setCart(!cart)}>
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
