import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Img from 'gatsby-image';
import './styles/header.scss';

const LookbookFront = (props) => {
  const { image, link } = props;
  return (
    <Link to={link}>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width: 450,
          height: 650,
          border: '2px solid black',
          borderRadius: '24px',
          top: '50%',
          transform: `translate(70%, -50%)`,
          backgroundColor: '#154734',
          marginRight: 100,
        }}
      >
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
