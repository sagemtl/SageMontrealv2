import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import LookbookFront from '../components/lookbookFront';

import '../styles/lookbook.scss';

const LookbookMenu = ({ uri }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  return (
    <Layout current={uri}>
      <div className={width >= 900 ? 'lookbook' : 'lookbook-mobile'}>
        {[0, 0, 0, 0, 0].map(() => {
          return <LookbookFront link="/shop" image="test" />;
        })}
        <div className="lookbook-block" />
      </div>
    </Layout>
  );
};

LookbookMenu.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default LookbookMenu;
