import BackendStatus from "./BackendStatus/BackendStatus";
import IndexSearchBar from "./IndexSearchBar/IndexSearchBar";
import styles from "./Header.module.css";
import SearchToggle from "./SearchToggle/SearchToggle";
import { useSearchMode } from "@/context/SearchModeContext";
import { useState } from "react";

export default function Header() {
  const { isMovieSearch, setIsMovieSearch } = useSearchMode();
  const [isSeedersSearchMode, setisSeedersSearchMode] = useState(false);

  return (
    <>
      <div className={styles.searchBar}>
        <BackendStatus />
        <IndexSearchBar />
      </div>
      <div className={styles.toggleWrapper}>
        <SearchToggle
          boolValue={isMovieSearch}
          setBoolValue={setIsMovieSearch}
          firstString="Movie"
          secondString="Series"
        />
        <SearchToggle
          boolValue={isSeedersSearchMode}
          setBoolValue={setisSeedersSearchMode}
          firstString="Seed"
          secondString="Size"
        />
      </div>
    </>
  );
}
