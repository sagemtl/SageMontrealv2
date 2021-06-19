import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import './styles/shopBackground.scss';

export default function ShopBackground({ mobile }) {
  const data = useStaticQuery(graphql`
    query {
      desktop: allFile(
        filter: { relativePath: { eq: "sage-shop-cornfield-background.jpg" } }
      ) {
        edges {
          node {
            childImageSharp {
              # Specify a fixed image and fragment.
              # The default width is 400 pixels
              fixed(width: 1440, quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }

      mobile: allFile(
        filter: {
          relativePath: { eq: "sage-shop-cornfield-background-mobile.jpg" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              # Specify a fixed image and fragment.
              # The default width is 400 pixels
              fixed(width: 665, quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);

  return mobile ? (
    <Img
      className="shop-background"
      fixed={data.mobile.edges[0].node.childImageSharp.fixed}
      style={{}}
      imgStyle={{}}
      alt="Shop Wheel Art"
    />
  ) : (
    <Img
      className="shop-background"
      fixed={data.desktop.edges[0].node.childImageSharp.fixed}
      style={{}}
      imgStyle={{}}
      alt="Shop Wheel Art"
    />
  );
}

ShopBackground.propTypes = {
  mobile: PropTypes.bool.isRequired,
};
