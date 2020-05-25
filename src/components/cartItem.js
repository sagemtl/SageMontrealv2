import React from 'react';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const CartItem = ({ amount, size, price, image }) => {
  return (
    <div className="cart__item">
      <div className="cart__item__amount">
        <b>{amount}x</b>
      </div>
      <img className="cart__item__image" height="50" src={image} alt="test" />
      <div className="cart__item__size">
        <b>{size}</b>
      </div>
      <div className="cart__item__price">
        <b>${price}</b>
      </div>
      <ClearRoundedIcon fontSize="small" className="cart__item__close" />
    </div>
  );
};

export default CartItem;
