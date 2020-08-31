import React, { useEffect, useState, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import './styles/success.scss';

import CartItem from '../components/cartItem';
import { transpileModule } from 'typescript';
import { GlobalContext } from '../context/Provider';

const Success = () => {

  const { state, dispatch } = useContext(GlobalContext);
  const { successEmail, successItems } = state;

  return (
    <Layout>
      <div className="text-center success-align-middle">
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
          {successEmail}.
          <br />
          Your items will be shipped the following day and should arrive within
          a week.
          <br />
          Thank you for shopping with us!!{' '}
        </p>
      </div>

      <div className="success-page-cart">
          {successItems.map((item) => {
              return (
                <CartItem
                  name={item.name}
                  amount={item.amount}
                  size={item.size}
                  price={item.price}
                  image={item.image}
                  id={item.id}
                  skuId={item.sku}
                  prodMetadata={item.prodMetadata}
                  isCheckout={true}
                />
              );
            })}
      </div>
    </Layout>
  );
};

export default Success;
