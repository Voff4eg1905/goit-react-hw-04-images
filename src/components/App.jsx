import React, { Component } from 'react';
import css from './styles.module.css';
import { fetchImages } from 'components/pixabayAPI';

import Searchbar from './Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';

import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';

export default class App extends Component {
  state = {
    query: '',
    searchResults: {},
    error: null,
    status: 'idle',
    total: 0,
    page: 1,
  };

  onSubmit = query => {
    this.setState({ query, page: 1 });
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;

    if (prevQuery !== newQuery || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      fetchImages(newQuery, this.state.page)
        .then(query => {
          if (query.totalHits !== 0) {
            return this.setState({
              searchResults: query,
              total: query.totalHits,
              status: 'resolved',
              isLoading: false,
            });
          }
          this.setState({
            status: 'rejected',
            isLoading: false,
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
    const { query, searchResults, status, page } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery searchResults={searchResults}></ImageGallery>
        )}
        {query !== '' && this.hasPagesLeft(page) && status === 'resolved' && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {status === 'rejected' && <p>There is a mistake. Cant find {query}</p>}
      </div>
    );
  }
}
