import React, { useContext, useEffect} from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import CartItem from './cartItem';

import { GlobalContext } from '../context/Provider';

const CartCheckout = ({ isMobile }) => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;

  useEffect(() => {
      console.log(checkoutItems)
  })

  return (
    <div className="cart-checkout">
      {checkoutItems.map((item) => {
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
  );
};

CartCheckout.propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };

export default CartCheckout;