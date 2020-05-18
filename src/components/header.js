import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Img from 'gatsby-image';

const styles = {
  navbox: {
    position: 'fixed',
    left: 30,
    top: 30,
    width: 175,
    height: 225,
    border: '2px solid black',
    borderRadius: 15,
    backgroundColor: 'white',
    zIndex: 10,
    overflow: 'hidden',
  },
  logoImage: {
    width: 70,
    height: 'auto',
    margin: '0 auto',
    top: 25,
  },
  link: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: 'black',
    textDecoration: 'none',
  },
  linkSelected: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: 'white',
    textDecoration: 'none',
    backgroundColor: '#154734',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 0,
  },
};

const Header = ({ siteTitle }) => {
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
    <div style={styles.navbox}>
      <header>
        <div>
          <Link to="/">
            <Img
              style={styles.logoImage}
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
        }}
      />
      <div>
        <Link style={styles.link} to="/shop">
          <h2 style={styles.text}>Boutique</h2>
        </Link>
      </div>
      <hr
        style={{
          marginTop: 0,
          marginBottom: 0,
          height: 2,
          backgroundColor: 'black',
        }}
      />
      <div>
        <Link style={styles.link} to="/shop">
          <h2 style={styles.text}>Lookbook</h2>
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
