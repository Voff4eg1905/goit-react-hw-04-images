import css from '../styles.module.css';
export default function ImageGalleryItem({ items }) {
  return (
    <>
      {items.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <li className={css.ImageGalleryItem} key={id}>
            <img
              src={webformatURL}
              alt={tags}
              className={css.ImageGalleryItemImage}
            />
          </li>
        );
      })}
    </>
  );
}
