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

  const isMobile = width < 900;

  return (
    <Layout current={uri}>
      <div className={isMobile ? 'lookbook-mobile' : 'lookbook'}>
        <div className="lookbook-scroll">
          {[0, 0, 0, 0, 0].map(() => {
            return (
              <LookbookFront link="/shop" image="test" isMobile={isMobile} />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

LookbookMenu.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default LookbookMenu;
