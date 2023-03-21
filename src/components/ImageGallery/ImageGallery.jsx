import React from 'react';

import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';

export const ImageGallery = ({ searchResults }) => {
  console.log(searchResults);
  return (
    <ul className={css.ImageGallery}>
      {searchResults.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            modalImage={largeImageURL}
            alt={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  searchResults: propTypes.array,
};
