import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Img from 'gatsby-image';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import './styles/lookbookFront.scss';
import Fade from '@material-ui/core/Fade';

const LookbookFront = ({ label, images, isMobile }) => {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <div
        className={isMobile ? 'lookbook-front-mobile' : 'lookbook-front'}
        onClick={() => setOpen(true)}
      >
        <h1 className="lookbook-front__header">{label}</h1>
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
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LookbookFront;
