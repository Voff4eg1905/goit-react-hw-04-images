import React from 'react';
import Loader from 'components/Loader/Loader';

import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';

export const ImageGallery = ({ query, searchResults, status }) => {
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <ul className={css.ImageGallery}>
        {searchResults.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
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
  }
  if (status === 'rejected') {
    return <p>There is a mistake. Cant find {query}</p>;
  }
};

ImageGallery.propTypes = {
  query: propTypes.string.isRequired,
  searchResults: propTypes.object,
  status: propTypes.string.isRequired,
};
