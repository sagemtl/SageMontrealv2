import React from 'react';
import Layout from '../components/layout';
import octopus404 from '../assets/404-octopus.png';

import './styles/404.scss';

const NotFoundPage = () => (
  <Layout>
    <div className="not-found">
      <img
        src={octopus404}
        alt="404 Octopus"
      />
      <h1 className="not-found__header">404 | NOT FOUND</h1>
      <p className="not-found__text">
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </div>
  </Layout>
);

export default NotFoundPage;
