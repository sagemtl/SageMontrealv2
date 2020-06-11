import React, { useContext } from 'react';
import { Link } from 'gatsby';
import CartItem from './cartItem';

import { GlobalContext } from '../context/Provider';

const Cart = () => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;

  return (
    <div className="cart">
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
         <Link to="/checkout">
          <button type="submit" className="cart__button">
            Checkout
          </button>
        </Link>
      )}
    </div>
  );
};

export default Cart;
