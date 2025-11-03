import BackendStatus from "./BackendStatus/BackendStatus";
import IndexSearchBar from "./IndexSearchBar/IndexSearchBar";
import styles from "./Header.module.css";
import SearchMode from "./SearchMode/SearchMode";

export default function Header() {
  return (
    <div>
      <div className={styles.searchBar}>
        <BackendStatus />
        <IndexSearchBar />
      </div>
      <SearchMode />
    </div>
  );
}
