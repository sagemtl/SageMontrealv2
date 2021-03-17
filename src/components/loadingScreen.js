import React from 'react';
import sageAnimated from '../assets/sage-animated.gif';
import './styles/loadingScreen.scss';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <video
        src="https://res.cloudinary.com/sagemontreal-com/video/upload/v1596165122/Logo_vyryy9.mp4"
        poster={sageAnimated}
        className="loading-screen__logo"
        muted
        playsInline
        loop
      />
      <div className="loading-screen__text">Confirming your order...</div>
    </div>
  );
};

export default LoadingScreen;
