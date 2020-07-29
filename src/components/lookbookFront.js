import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import './styles/lookbookFront.scss';
import Fade from '@material-ui/core/Fade';

const LookbookFront = ({ label, season, images }) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [index, setIndex] = useState(0);

  const modalContent = (
    <Fade in={open}>
      <div className="lookbook-modal-content">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              className="lookbook-front__image"
              alt={`${label}-${index}`}
            />
          );
        })}
      </div>
    </Fade>
  );

  useEffect(() => {
    if (hover) {
      setTimeout(() => {
        if (images.length > 1) {
          setIndex(index + 1);
          if (index === images.length - 1) {
            setIndex(0);
          }
        }
      }, 1500);
    } else {
      setIndex(0);
    }
  }, [hover, images.length, index]);

  return (
    <>
      <div
        className="lookbook-front"
        onClick={() => setOpen(true)}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundImage: `url(${images[0]})`,
        }}
      >
        <h1 className="lookbook-front__header--animation">{label}</h1>
        <p className="lookbook-front__text--animation">{season}</p>
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
  label: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LookbookFront;
