import { useState } from 'react';
import propTypes from 'prop-types';
import css from '../styles.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onChange = event => {
    let input = event.currentTarget.value.toLowerCase();
    setQuery(input);
  };
  const onFormSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      alert('Need to enter name please');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
