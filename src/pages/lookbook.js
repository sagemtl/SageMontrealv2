import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import LookbookFront from '../components/lookbookFront';

const LookbookMenu = (props) => {
  const { uri } = props;
  return (
    <Layout current={uri}>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'inline-block',
          overflow: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {[0, 0, 0, 0, 0].map(() => {
          return <LookbookFront link="/shop" image="test" />;
        })}
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            width: 200,
            height: 650,
            top: '50%',
            transform: `translate(70%, -50%)`,
          }}
        />
      </div>
    </Layout>
  );
};

LookbookMenu.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default LookbookMenu;
