import React, { useState } from 'react';
import Layout from '../components/layout';
import './styles/contact.scss';

const Contact = ({ uri }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Layout current={uri}>
      <div className="contact">
        <h1>Contact Us</h1>
        <div className="contact-form">
          <div className="contact-form__group">
            <p className="contact-form__label">Name*:</p>
            <input
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="contact-form__input"
            />
          </div>
          <div className="contact-form__group">
            <p className="contact-form__label">Email*:</p>
            <input
              name="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="contact-form__input"
            />
          </div>
          <div className="contact-form__group">
            <p className="contact-form__label">Phone:</p>
            <input
              name="phone"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="contact-form__input"
            />
          </div>
          <div className="contact-form__group">
            <p className="contact-form__label">Message*:</p>
            <textarea
              name="message"
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="contact-form__input-area"
              rows={5}
            />
          </div>
          <button className="contact-form__button" type="button">
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
