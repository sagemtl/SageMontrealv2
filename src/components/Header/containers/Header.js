import React from 'react';
import PropTypes from 'prop-types';
import HeaderDesktop from '../components/HeaderDesktop';
import HeaderMobile from '../components/HeaderMobile';
import '../styles/header.scss';
import { useLocation } from '@reach/router';


const Header = ({ isMobile }) => {
  return <>{isMobile ? <HeaderMobile /> : <HeaderDesktop />}</>;
};

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Header;
