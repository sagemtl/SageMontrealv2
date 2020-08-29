import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import './styles/contact.scss';

const Contact = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const clearForm = () => {
    setName('');
    setSubject('');
    setEmail('');
    setMessage('');
  };

  const sendForm = async () => {
    try {
      await axios.post('https://sagemtl-backend.herokuapp.com/contact', {
        name,
        subject,
        email,
        message,
      });
      clearForm();
      setSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      {!sent ? (
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
              <p className="contact-form__label">Subject:</p>
              <input
                name="subject"
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
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
            <button
              className="contact-form__button"
              type="button"
              onClick={sendForm}
              disabled={
                name.length === 0 || email.length === 0 || message.length === 0
              }
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="contact-confirmation">
          <h1 className="contact-confirmation__header">
            Your message has been sent successfully!
          </h1>
          <p>We will get back to you as soon as possible</p>
        </div>
      )}
    </Layout>
  );
};

export default Contact;
