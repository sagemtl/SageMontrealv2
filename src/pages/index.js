import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import './styles/index.scss';
import '../components/styles/layout.scss';

const IndexPage = ({ uri }) => {
  return (
    <Layout current={uri} footerTransparent hideCart footerColor="white">
      <>
        <SEO title="Home" />
        <div className="artstep-wrapper">
          <div className="artstep-overlay" />
          <iframe
            title="Virtual Museum"
            width="100%"
            style={{ margin: 0 }}
            height="100%"
            src="https://www.artsteps.com/embed/5f035eac83ecaf0b05dfd83c/560/315"
            frameBorder="0"
            allowFullScreen
          />
          <div className="index-text">
            <h1 className="index-text__header--main">
              <b>Sage Montreal</b>
            </h1>
          </div>
        </div>
      </>
    </Layout>
  );
};

IndexPage.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default IndexPage;
