import { useState } from 'react';
import propTypes from 'prop-types';

import css from '../styles.module.css';
import { ModalWindow } from 'components/Modal/Modal';

export default function ImageGalleryItem({ image, modalImage, alt }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <ModalWindow
          isOpen={isModalOpen}
          image={modalImage}
          tags={alt}
          onClose={closeModal}
        />

        <img
          src={image}
          alt={alt}
          className={css.ImageGalleryItemImage}
          onClick={openModal}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: propTypes.string,
  modalImage: propTypes.string,
  alt: propTypes.string,
};
