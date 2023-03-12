import React, { Component } from 'react';
import css from './styles.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    query: '',
  };
  onSubmit = query => {
    this.setState({ query });
  };
  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery></ImageGallery>
      </div>
    );
  }
}
