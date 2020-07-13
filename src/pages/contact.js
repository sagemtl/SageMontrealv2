import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import Layout from '../components/layout';

import '../styles/contact.scss';

const contact = ({ uri }) => {
  return (
    <Layout current={uri}>
      <div className="contact">
        <h1 className="contact__header">Contact Us</h1>
        <div className="contact-row">
          <EmailIcon className="contact__icon" />
          <p className="contact__text">sagemontreal@test.com</p>
        </div>
      </div>
    </Layout>
  );
};

export default contact;
