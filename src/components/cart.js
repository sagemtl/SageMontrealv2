import React from 'react';

const styles = {
  cart: {
    position: 'fixed',
    right: 30,
    top: 30,
    width: 175,
    height: 225,
    border: '2px solid black',
    borderRadius: 15,
    backgroundColor: 'white',
    zIndex: 10,
  },
};

const Cart = () => {
  return (
    <div style={styles.cart}>
      <hr
        style={{ marginTop: 45, marginBottom: 0, height: 2, color: 'black' }}
      />
    </div>
  );
};

export default Cart;
