import React, { Component } from 'react';
import propTypes from 'prop-types';

import css from '../styles.module.css';
import { fetchImages } from 'components/pixabayAPI';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    searchResults: '',
    error: null,
    status: 'idle',
    total: 0,
    page: 1,
  };
  static propTypes = {
    query: propTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const newQuery = this.props.query;

    if (prevQuery !== newQuery || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      const pageToSearch =
        prevQuery === newQuery ? this.state.page : this.setState({ page: 1 });
      fetchImages(newQuery, pageToSearch)
        .then(query => {
          console.log(query);
          if (query.totalHits !== 0) {
            return this.setState({
              searchResults: query,
              total: query.total,
              status: 'resolved',
            });
          }
          this.setState({
            status: 'rejected',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  hasPagesLeft = page => {
    const totalPages = this.state.total / 12;
    return page < totalPages;
  };
  render() {
    const { searchResults, status } = this.state;
    const { query } = this.props;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <ul className={css.ImageGallery}>
          <ImageGalleryItem items={searchResults} />
          {this.state.query !== '' &&
            this.state.isLoading !== true &&
            this.hasPagesLeft(this.state.page) && (
              <Button onLoadMore={this.onLoadMore} />
            )}
        </ul>
      );
    }
    if (status === 'rejected') {
      return <p>There is a mistake. Cant find {query}</p>;
    }
  }
}
