import { useSearchMode } from "@/context/SearchModeContext";
import styles from "./SearchMode.module.css";

function SearchMode() {
  const { isMovieSearch, setIsMovieSearch } = useSearchMode();

  return (
    <div className={styles.container}>
      <div
        className={[
          styles.button,
          styles.left,
          isMovieSearch && styles.active,
        ].join(" ")}
        onClick={() => setIsMovieSearch(true)}
      >
        Movie
      </div>
      <div
        className={[
          styles.button,
          styles.right,
          !isMovieSearch && styles.active,
        ].join(" ")}
        onClick={() => setIsMovieSearch(false)}
      >
        Series
      </div>
    </div>
  );
}

export default SearchMode;
