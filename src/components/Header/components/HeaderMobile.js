import React, { useContext, useState, useRef } from 'react';
import { Link } from 'gatsby';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { GlobalContext } from '../../../context/Provider';

const HeaderMobile = () => {
  const [cart, setCart] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);
  const { navOpen } = state;

  const video = useRef();

  const openNavbar = () => {
    // video.current.play();
    dispatch({
      type: 'SET_NAVBAR_OPEN',
      payload: {
        navOpen: !navOpen,
      },
    });
    // setTimeout(() => video.current.pause(), 3000);
  };

  return (
    <div className="header-mobile">
      <div
        className="header-mobile-animated"
        style={navOpen ? { left: 0 } : { left: 'calc(100% / 4 * -2)' }}
      >
        <Link to="/shop" className="header-mobile__button">
          <StorefrontOutlinedIcon
            style={{ color: '#154734' }}
            fontSize="large"
            className="header-mobile__icon"
          />
        </Link>
        <Link to="/lookbook" className="header-mobile__button">
          <PhotoAlbumOutlinedIcon
            style={{ color: '#154734' }}
            fontSize="large"
            className="header-mobile__icon"
          />
        </Link>
        <div
          role="button"
          tabIndex={0}
          className="header-mobile__logo-button"
          onClick={() => openNavbar()}
          onKeyDown={() => openNavbar()}
        >
          {/* <video
            src="https://res.cloudinary.com/sagemontreal-com/video/upload/v1596165122/Logo_vyryy9.mp4"
            ref={video}
            className="header-mobile__logo"
            muted
            playsInline
            loop
          /> */}
          <img
            style={{ margin: 0 }}
            className="header-mobile__logo"
            src="https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-animated.gif"
            alt="Sage Logo"
          />
        </div>
      </div>
      <div
        className="header-mobile-cart"
        role="button"
        tabIndex={-1}
        onClick={() => setCart(!cart)}
        onKeyDown={() => setCart(!cart)}
      >
        {cart ? (
          <CloseIcon fontSize="large" className="header-mobile__icon" />
        ) : (
          <img
            style={{ margin: 0 }}
            className="header-mobile__cart"
            src="https://sageimagebank.s3.ca-central-1.amazonaws.com/shopping-bag.png"
            alt="Sage Shopping Bag"
          />
        )}
      </div>
    </div>
  );
};

export default HeaderMobile;
