import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/index.scss';
import Background1 from '../images/sage-background.jpg';
import Background2 from '../images/sage-background-2.jpg';

const IndexPage = ({ uri }) => {
  const [swap, setSwap] = useState(true);

  return (
    <Layout current={uri} footerTransparent hideCart>
      <SEO title="Home" />
      <div
        className="index"
        style={
          swap
            ? { backgroundImage: `url(${Background1})` }
            : { backgroundImage: `url(${Background2})` }
        }
      >
        <label className="switch">
          <input type="checkbox" />
          <span onClick={() => setSwap(!swap)} className="slider round" />
        </label>
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default IndexPage;
