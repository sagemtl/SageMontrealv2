import React, { useContext } from 'react';
import { Link } from 'gatsby';
import CartItem from './cartItem';

import { GlobalContext } from '../context/Provider';

const Cart = () => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;

  const goToCheckout = () => {
    if (window.datadogLogs) {
      const checkoutLog = checkoutItems.map((item) => ({
        name: item.name,
        amount: item.amount,
        size: item.size,
        price: item.price,
        skuId: item.skuId,
        metadata: item.prodMetadata,
      }));

      window.datadogLogs.logger.info('Checkout cart', {
        checkoutLog,
      });
    }
  };

  return (
    <div className="cart">
      {checkoutItems.map((item) => {
        return <CartItem {...item} key={item.skuId} />;
      })}
      {checkoutItems.length > 0 && (
        <Link to="/checkout">
          <button onClick={goToCheckout} type="submit" className="cart__button">
            Checkout
          </button>
        </Link>
      )}
    </div>
  );
};

export default Cart;
