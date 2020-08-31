import React, { useContext, useEffect, useState } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Img from 'gatsby-image';
import { GlobalContext } from '../context/Provider';
import { getSkuInventory } from '../helpers/stripeHelper';

const CartItem = ({ name, amount, size, price, image, id, skuId, prodMetadata }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    const getInventory = async () => {
      const inv = await getSkuInventory(
        prodMetadata.item,
        prodMetadata.colour,
        size,
        skuId
      )
      // will show out of stock
      if (inv.quantity < amount) {
        setInStock(false);
      }
    };

    getInventory();
  }, []);

  const removeItem = (e) => {
    e.stopPropagation();
    const itemsCopy = Array.from(state.checkoutItems);
    itemsCopy.splice(
      itemsCopy.findIndex((item) => {
        return item.id === id;
      }),
      1,
    );

    dispatch({
      type: 'SET_CHECKOUT_ITEMS',
      payload: {
        checkoutItems: itemsCopy,
      },
    });
  };

  const handleClick = () => {
    navigate(`/shop/${name.replace(/ +/g, '-')}`);
  };

  //will show out of stock if no stock
  const showAmount = () => {
    if(inStock) {
      return (
        <b>{amount}x</b>
      );
    } else {
      return (
        <b className="cart__item__noStockMsg">Out of stock</b>
      );
    }
  }

  return (
    <div
      className={inStock? "cart__item" : "cart__item cart__item__noStock"}
      onClick={() => handleClick()}
      onKeyDown={() => handleClick()}
      role="button"
      tabIndex={0}
    >
      <div className="cart__item__amount">
        {showAmount()}
      </div>
      {/* <div > */}
        <Img
          className="cart__item__image"
          height="50"
          fixed={image}
          alt="cart item"
        />
      {/* </div> */}
      <div className="cart__item__size">
        <b>{size}</b>
      </div>
      <div className="cart__item__price">
        <b>${price}</b>
      </div>
      <ClearRoundedIcon
        fontSize="small"
        className="cart__item__close"
        onClick={removeItem}
      />
    </div>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.shape.isRequired,
  id: PropTypes.string.isRequired,
  skuId: PropTypes.string.isRequired,
  prodMetadata: PropTypes.object.isRequired,
};

export default CartItem;
