import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={styles.loadMoreButton} onClick={onClick}>
      Load more
    </button>
  );
}
