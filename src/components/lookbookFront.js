import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import './styles/lookbookFront.scss';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';

const LookbookFront = ({ season, images, cover, position }) => {
  const [open, setOpen] = useState(false);

  const modalContent = (
    <Fade in={open}>
      <div className="lookbook-modal-content">
        <CloseIcon
          className="close-modal"
          fontSize="large"
          stroke="white"
          stroke-width={0.5}
          onKeyDown={() => setOpen(false)}
          onClick={() => setOpen(false)}
        />
        {images.map((image) => {
          return (
            <img
              src={image}
              className="lookbook-front__image"
              alt="Lookbook cover"
              key={image}
            />
          );
        })}
      </div>
    </Fade>
  );

  return (
    <>
      <div
        role="button"
        className="lookbook-front"
        onKeyDown={() => setOpen(true)}
        onClick={() => setOpen(true)}
        tabIndex={0}
        style={{
          backgroundImage: `url(${cover})`,
          backgroundPosition: position,
        }}
      >
        <div className="lookbook-front-overlay">
          <p className="lookbook-front__text">{season}</p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="lookbook-modal"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {modalContent}
      </Modal>
    </>
  );
};

LookbookFront.propTypes = {
  season: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  cover: PropTypes.string.isRequired,
  position: PropTypes.string,
};

LookbookFront.defaultProps = {
  position: 'center top',
};

export default LookbookFront;
