import React, { Component } from 'react';
import css from '../styles.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  onChange = event => {
    let input = event.currentTarget.value.toLowerCase();
    this.setState({ query: input });
  };
  onSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      alert('Need to enter name please');
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}
