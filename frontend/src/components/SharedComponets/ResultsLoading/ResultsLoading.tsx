import styles from "./ResultsLoading.module.css";

export default function ResultsLoading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
}
