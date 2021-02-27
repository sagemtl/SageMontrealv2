import React, { useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Img from 'gatsby-image';
import { useLocation } from '@reach/router';
import { GlobalContext } from '../context/Provider';
import { getSkuInventory } from '../helpers/stripeHelper';

const CheckoutItem = ({
  name,
  amount,
  size,
  price,
  image,
  id,
  skuId,
  prodMetadata,
}) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const getInventory = async () => {
      const inv = await getSkuInventory(
        prodMetadata.item,
        prodMetadata.colour,
        size,
        skuId,
      );
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

  const showAmount = () => {
    return <b>{amount}x</b>;
  }

  return (
    <div
      className="cart_checkout__item"
      onClick={() => handleClick()}
      onKeyDown={() => handleClick()}
      role="button"
      tabIndex={0}
    >
      <div className="cart_checkout__item__amount">{showAmount()}</div>
      <div className="image-wrapper">
        <Img
          style={{ display: 'block', position: 'absolute' }}
          className="cart_checkout__item__image"
          height="50"
          fixed={image}
          alt="cart item"
        />
      </div>
      <div className="cart_checkout__item__name">
        <b>{name}</b>
      </div>
      <div className="cart_checkout__item__size">
        <b>{size}</b>
      </div>
      <div className="cart_checkout__item__price">
        <b>${price}</b>
      </div>
      <ClearRoundedIcon
        fontSize="small"
        className="cart_checkout__item__close"
        onClick={removeItem}
      />
    </div>
  );
};

CheckoutItem.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.shape.isRequired,
  id: PropTypes.string.isRequired,
  skuId: PropTypes.string.isRequired,
  prodMetadata: PropTypes.object.isRequired,
};

export default CheckoutItem;
