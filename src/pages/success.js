import React, { useContext } from 'react';
import Layout from '../components/layout';
import './styles/success.scss';

import CheckoutItem from '../components/checkoutItem';
import { GlobalContext } from '../context/Provider';

const Success = () => {
  const { state } = useContext(GlobalContext);
  const { successEmail, successItems } = state;

  return (
    <Layout>
      <div className="text-center success-align-middle">
        <img
          className="success-sage-logo"
          src="https://res.cloudinary.com/sagemontreal-com/image/upload/v1614452514/frog.png"
          alt="Success"
        />
        <p>
          {' '}
          <strong>Your order has been placed!</strong> <br />
          Your payment has been successfully processed and a receipt has been
          sent to <strong>{successEmail}</strong>.
          <br />
          <br />
          Your items will be shipped the following day and should arrive within
          a week.
          <br />
          <br />
          Thank you for shopping with us!{' '}
        </p>
      </div>

      <div className="success-page-cart">
        {successItems.map((item) => {
          return (
            <CheckoutItem
              name={item.name}
              amount={item.amount}
              size={item.size}
              price={item.price}
              priceUSD={item.priceUSD}
              image={item.image}
              id={item.id}
              skuId={item.skuId}
              prodMetadata={item.prodMetadata}
              key={item.id}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Success;
