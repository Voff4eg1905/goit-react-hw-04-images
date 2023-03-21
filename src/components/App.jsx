import { useState, useEffect } from 'react';
import css from './styles.module.css';
import { fetchImages } from 'components/pixabayAPI';

import Searchbar from './Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';

import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';

export default function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const onSubmit = search => {
    setQuery(search);
    setPage(1);
  };
  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');
    fetchImages(query, page)
      .then(results => {
        const resultsArr = results.hits;

        if (results.totalHits !== 0) {
          return (
            setSearchResults(searchResults => [
              ...searchResults,
              ...resultsArr,
            ]),
            setTotal(results.totalHits),
            setStatus('resolved')
          );
        }
        setStatus('rejected');
      })
      .catch(error => {
        return setError(error), setStatus('rejected');
      });
  }, [query, page]);

  const onLoadMore = () => {
    setPage(prevpage => prevpage + 1);
  };
  const hasPagesLeft = page => {
    const totalPages = total / 12;
    return page < totalPages;
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImageGallery searchResults={searchResults}></ImageGallery>
      )}
      {query !== '' && hasPagesLeft(page) && status === 'resolved' && (
        <Button onLoadMore={onLoadMore} />
      )}
      {status === 'rejected' && (
        <p>
          There is a mistake. Cant find {query}
          {error !== null && <p> cause of {error.message} </p>}
        </p>
      )}
    </div>
  );
}
