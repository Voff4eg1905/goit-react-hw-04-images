import css from '../styles.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" onClick={onLoadMore} className={css.Button}>
      Load more
    </button>
  );
};

export default Button;
