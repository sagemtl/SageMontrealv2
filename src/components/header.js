import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Img from 'gatsby-image';
import './styles/header.scss';

const Header = (props) => {
  const { siteTitle, current } = props;
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "LOGO.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className="navbox">
      <header>
        <div>
          <Link to="/">
            <Img
              className="navbox__logo"
              fluid={data.placeholderImage.childImageSharp.fluid}
              alt={siteTitle}
            />
          </Link>
        </div>
      </header>
      <hr
        style={{
          marginTop: 45,
          marginBottom: 0,
          height: 2,
          backgroundColor: 'black',
          border: 'none',
        }}
      />
      <div>
        <Link
          className={current === '/shop' ? 'navbox__selected' : 'navbox__link'}
          to="/shop"
        >
          <h2 className="navbox__text">Boutique</h2>
        </Link>
      </div>
      <hr
        style={{
          marginTop: 0,
          marginBottom: 0,
          height: 2,
          backgroundColor: 'black',
          border: 'none',
        }}
      />
      <div>
        <Link className="navbox__link" to="/shop">
          <h2 className="navbox__text">Lookbook</h2>
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
};

export default Header;
