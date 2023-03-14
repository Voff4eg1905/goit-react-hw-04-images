import React, { Component } from 'react';
import propTypes from 'prop-types';

import css from '../styles.module.css';
import { ModalWindow } from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  static propTypes = {
    image: propTypes.string,
    modalImage: propTypes.string,
    alt: propTypes.string,
  };
  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { image, modalImage, alt } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <ModalWindow
            isOpen={isModalOpen}
            image={modalImage}
            tags={alt}
            onClose={this.closeModal}
          />

          <img
            src={image}
            alt={alt}
            className={css.ImageGalleryItemImage}
            onClick={this.openModal}
          />
        </li>
      </>
    );
  }
}
