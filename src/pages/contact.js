import React from 'react';
import Layout from '../components/layout';

import '../styles/contact.scss';

const contact = ({ uri }) => {
  return (
    <Layout current={uri}>
      <div className="contact">
        <div className="contact-column">
          <img
            src="https://res.cloudinary.com/sagemontreal-com/image/upload/v1596397009/ContactCover_jrd5x3.png"
            className="contact__image"
            alt="Contact Artwork"
          />
          <h1 className="contact__header">Sage Montréal</h1>
          <h1 className="contact__header">S.E.N.C ©2017</h1>
          <br />
          <p className="contact__header--2">Instagram</p>
          <p className="contact__text">@sagemtl</p>
          <br />
          <p className="contact__header--2">Email</p>
          <p className="contact__text">info@sagemontreal.com</p>
        </div>
        <div className="contact-column">
          <p className="contact__header--2">Shipping</p>
          <br />
          <p className="contact__text">
            All orders are shipped within 1-2 business days
          </p>
          <p className="contact__text">
            Orders shipped outside of Canada may possibly incur duties and taxes
          </p>
          <br />
          <p className="contact__header--2">Shipping rates</p>
          <br />
          <p className="contact__text">
            <u>Canada</u>
          </p>
          <div className="contact-row">
            <p className="contact__text">Mail (4 - 10 Business Days)</p>
            <p className="contact__text">Free</p>
          </div>
          <div className="contact-row">
            <p className="contact__text">
              Expedited Parcel (2 - 4 Business Days)
            </p>
            <p className="contact__text">$5</p>
          </div>
          <br />
          <p className="contact__text">
            <u>USA</u>
          </p>
          <div className="contact-row">
            <p className="contact__text">
              Expedited Parcel (5 - 10 Business Days)
            </p>
            <p className="contact__text">$15</p>
          </div>
          <br />
          <p className="contact__text">
            <u>International</u>
          </p>
          <div className="contact-row">
            <p className="contact__text">
              Small Packet - Air (6 - 12 Business Days)
            </p>
            <p className="contact__text">$20</p>
          </div>
          <br />
          <p className="contact__text">
            *Orders above $75 have free expedited shipping
          </p>
          <br />
          <p className="contact__header--2">Payments</p>
          <br />
          <p className="contact__text">
            All listed prices are in Canadian Dollars.
          </p>
          <p className="contact__text">
            Currently accepted payments are American Express, Visa & Mastercard.
          </p>
        </div>
        <div className="contact-column">
          <p className="contact__header--2">Returns & exchanges</p>
          <br />
          <p className="contact__text">
            If you received a package that is defective or incorrect, you may
            return the package within 14 days after its reception by contacting
            us at info@sagemontreal.com and using the return label inside your
            order.
          </p>
          <br />
          <p className="contact__text">
            For international customers, you may communicate with our teams for
            further details.
          </p>
          <br />
          <p className="contact__text">
            To file a return, please include your order number along with
            relevant pictures of the defective item(s) and one of our team
            members will authorize your return. A full refund will be issued
            upon reception of the returned order.
          </p>
          <br />
          <p className="contact__header--2">Policies</p>
          <br />
          <p className="contact__text">
            SAGE reserves the right to cancel an order at any time. Cancellation
            reasons may occur but are not limited to: lack of stock for order
            fulfilment, fraud suspicion, or any discrepancies on an item's
            description or price. We will notify you if your order cannot be
            fulfilled and a full refund will be issued.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default contact;
