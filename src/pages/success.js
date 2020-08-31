import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import './styles/success.scss';

import CartItem from '../components/cartItem';

const Success = () => {
  const [userEmail, setUserEmail] = useState("")
  const [userPurchase, setUserPurchase] = useState([])

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setUserEmail(window.history.state.userEmail)
      setUserPurchase(window.history.state.purchase)
    }
  }, [[]]);

  return (
    <Layout>
      <div className="text-left success-align-middle">
        <img
          className="success-sage-logo"
          src="https://res.cloudinary.com/sagemontreal-com/image/upload/v1598851891/mr-frog-png_nsfobb.png"
          alt="Success"
        />
        <p>
          {' '}
          Your order has been placed! <br />
          Your payment has been successfully processed and a receipt has been
          sent to{' '}
          {userEmail}.
          <br />
          Your items will be shipped the following day and should arrive within
          a week.
          <br />
          Thank you for shopping with us!!{' '}
        </p>
      </div>

      <div className="success-page-cart">
          {userPurchase.map((item) => {
              return (
                <CartItem
                  id={item.id}
                  name={item.name}
                  amount={item.amount}
                  price={item.price}
                  size={item.size}
                  image={item.image}
                  isCheckout={true}
                />
              );
            })}
      </div>
    </Layout>
  );
};

export default Success;
