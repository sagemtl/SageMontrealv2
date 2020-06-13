import React, { useContext } from 'react';
import CartItem from './cartItem';

import { GlobalContext } from '../context/Provider';

const Cart = () => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;

  return (
    <div className="cart">
      <h1>Cart</h1>
      {checkoutItems.map((item) => {
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
      })}
      {checkoutItems.length > 0 && (
        <button type="submit" onClick="" className="cart__button">
          Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
