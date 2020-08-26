import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SEO from '../components/seo';

import './styles/index.scss';

const IndexPage = () => {
  return (
    <Layout footerTransparent hideCart footerColor="white">
      <>
        <SEO title="Home" />
        <div className="artstep-wrapper">
          <div className="artstep-overlay">
            <h1 className="artstep-wrapper__header">
              <b>Sage Montreal</b>
            </h1>
          </div>
          <iframe
            title="Virtual Museum"
            width="100%"
            height="100%"
            src="https://www.artsteps.com/embed/5f035eac83ecaf0b05dfd83c/560/315"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </>
    </Layout>
  );
};

IndexPage.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default IndexPage;
