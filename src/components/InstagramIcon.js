import React from 'react';
import PropTypes from 'prop-types';
import instagramSprite from '../images/instagram.svg';

const InstagramIcon = ({ name, color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <use xlinkHref={`${instagramSprite}#${name}`} />
  </svg>
);

InstagramIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

InstagramIcon.defaultProps = {
  color: 'currentColor',
  size: 24,
};

export default InstagramIcon;
