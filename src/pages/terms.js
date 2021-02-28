import React from 'react';
import Layout from '../components/layout';

import './styles/terms.scss';

const terms = ({ location }) => {
  return (
    <Layout location={location}>
      <div className="terms">
        <div className="terms-column">
          <img
            src="https://res.cloudinary.com/sagemontreal-com/image/upload/v1609558954/contactCover_sm2kk3.png"
            className="terms__image"
            alt="terms Artwork"
          />
          <h1 className="terms__header">Sage Montréal</h1>
          <h1 className="terms__header">S.E.N.C ©2017</h1>
          <br />
          <p className="terms__header--2">Instagram</p>
          <p className="terms__text">@sagemtl</p>
          <br />
          <p className="terms__header--2">Email</p>
          <p className="terms__text">info@sagemontreal.com</p>
        </div>
        <div className="terms-column">
          <p className="terms__header--2">Shipping</p>
          <p className="terms__text">
            All orders are shipped within 2-3 business days
          </p>
          <p className="terms__text">
            Orders made in the downtown Montreal area may be eligible for same
            day shipping
          </p>
          <p className="terms__text">
            Orders shipped outside of Canada may possibly incur duties and taxes
          </p>
          <br />
          <p className="terms__header--2">Shipping rates</p>
          <p className="terms__text">
            <u>Canada</u>
          </p>
          <div className="terms-row">
            <p className="terms__text">Mail (5 - 10 Business Days)</p>
            <p className="terms__text">$5</p>
          </div>
          <div className="terms-row">
            <p className="terms__text">Tracked Parcel (2 - 4 Business Days)</p>
            <p className="terms__text">$10</p>
          </div>
          <br />
          <p className="terms__text">
            <u>USA</u>
          </p>
          <div className="terms-row">
            <p className="terms__text">Tracked Parcel (7 - 14 Business Days)</p>
            <p className="terms__text">$20</p>
          </div>
          <br />
          <p className="terms__text">
            <u>International</u>
          </p>
          <div className="terms-row">
            <p className="terms__text">Tracked Parcel (1 - 3 Weeks)</p>
            <p className="terms__text">$40</p>
          </div>
          <br />
          <p className="terms__text">
            *Orders above $70 have free expedited shipping
          </p>
          <br />
          <p className="terms__header--2">Payments</p>
          <p className="terms__text">
            All listed prices are in Canadian Dollars.
          </p>
          <p className="terms__text">
            Currently accepted payments are American Express, Visa & Mastercard.
          </p>
        </div>
        <div className="terms-column">
          <p className="terms__header--2">Returns & exchanges</p>
          <p className="terms__text">
            If you received a package that is defective or incorrect, you may
            return the package within 14 days after its reception by contacting
            us at info@sagemontreal.com and using the return label inside your
            order.
          </p>
          <br />
          <p className="terms__text">
            For international customers, you may communicate with our teams for
            further details.
          </p>
          <br />
          <p className="terms__text">
            To file a return, please include your order number along with
            relevant pictures of the defective item(s) and one of our team
            members will authorize your return. A full refund will be issued
            upon reception of the returned order.
          </p>
          <br />
          <p className="terms__header--2">Policies</p>
          <p className="terms__text">
            SAGE reserves the right to cancel an order at any time. Cancellation
            reasons may occur but are not limited to: lack of stock for order
            fulfilment, fraud suspicion, or any discrepancies on an item's
            description or price. We will notify you if your order cannot be
            fulfilled and a full refund will be issued.
          </p>
          <br />
          <p className="terms__header--2">Local Pickup</p>
          <p className="terms__text">
            Pickups are only offered to Montreal residents. We will contact you
            by email about the pickup location and meeting time once the payment
            has been processed.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default terms;
