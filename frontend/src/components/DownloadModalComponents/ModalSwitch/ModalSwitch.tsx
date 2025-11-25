import { useSearchMode } from "@/context/SearchModeContext";
import styles from "./ModalSwitch.module.css";

export default function ModalSwitch() {
  const { isMovieSearch, setIsMovieSearch } = useSearchMode();

  return (
    <div className={styles.modalSwitchContainer}>
      <div
        className={`${styles.modalSwitch} ${isMovieSearch && styles.active}`}
        onClick={() => setIsMovieSearch(true)}
      >
        Movie
      </div>

      <div
        className={`${styles.modalSwitch} ${!isMovieSearch && styles.active}`}
        onClick={() => setIsMovieSearch(false)}
      >
        Series
      </div>
    </div>
  );
}
