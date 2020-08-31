import React, { useContext } from 'react';
import CartItem from './cartItem';
import { GlobalContext } from '../context/Provider';

const MobileCart = () => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;
  const getTotal = () => {
    let i;
    let totalPrice = 0;
    for (i = 0; i < checkoutItems.length; i += 1) {
      totalPrice += checkoutItems[i].amount * checkoutItems[i].price;
    }
    return totalPrice;
  };
  const cartIsEmpty = () => {
    return checkoutItems.length <= 0;
  };
  return (
    <div className="cart-checkout">
      {checkoutItems.map((item) => {
        return (
          <CartItem { ...item } />
        );
      })}
      {cartIsEmpty() ? (
        <div />
      ) : (
        <div className="summary">
          <b>Price: {getTotal()}$</b>
          <p>Shipping: 15$</p>
          <b>Total: {getTotal() + 15}$</b>
        </div>
      )}
    </div>
  );
};

export default MobileCart;
