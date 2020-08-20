import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import '../styles/success.scss';

import CartItem from '../components/cartItem';

const Success = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "sage-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Layout current="/success">
      <div className="text-left align-middle">
        <Img
          className="success-sage-logo"
          fluid={data.placeholderImage.childImageSharp.fluid}
          alt="Success"
        />
        <p>
          {' '}
          Your order has been placed! <br />
          Your payment has been successfully processed and a receipt has been
          sent to{' '}
          {typeof window !== `undefined` ? window.history.state.userEmail : ''}.
          <br />
          Your items will be shipped the following day and should arrive within
          a week.
          <br />
          Thank you for shopping with us!!{' '}
        </p>
      </div>

      <div className="cart-checkout">
        {typeof window !== `undefined`
          ? window.history.state.purchase.map((item) => {
              return (
                <CartItem
                  id={item.id}
                  name={item.name}
                  amount={item.amount}
                  price={item.price}
                  size={item.size}
                  image={item.image}
                />
              );
            })
          : undefined}
      </div>
    </Layout>
  );
};

export default Success;
