import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Img from 'gatsby-image';
import './styles/lookbookFront.scss';

const LookbookFront = ({ image, link, isMobile }) => {
  return (
    <Link to={link}>
      <div className={isMobile ? 'lookbook-front-mobile' : 'lookbook-front'}>
        {/*         
        <Img className="" fluid={image} alt="Sage Lookbook" />
      */}
      </div>
    </Link>
  );
};

LookbookFront.propTypes = {
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default LookbookFront;
