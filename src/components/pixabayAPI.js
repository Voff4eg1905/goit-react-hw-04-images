import propTypes from 'prop-types';

const API_KEY = '33192781-4f448e121a78d7e82e3362da2';
const BASE_url = 'https://pixabay.com/api/';
const itemsPerPage = 12;

export function fetchImages(query, page = 1) {
  const searchText = `${BASE_url}?key=${API_KEY}&q=${query}&page=${page}&per_page=${itemsPerPage}`;

  return fetch(searchText).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Unfortunately we are unable to find ${query}`)
    );
  });
}

fetchImages.propTypes = {
  query: propTypes.string.isRequired,
  page: propTypes.number,
};
