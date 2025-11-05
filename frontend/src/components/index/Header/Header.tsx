import BackendStatus from "./BackendStatus/BackendStatus";
import IndexSearchBar from "./IndexSearchBar/IndexSearchBar";
import styles from "./Header.module.css";
import SearchToggle from "./SearchToggle/SearchToggle";
import { useSearchMode } from "@/context/SearchModeContext";
import { useState } from "react";

export default function Header() {
  const { isMovieSearch, setIsMovieSearch } = useSearchMode();
  const [isSeedersSearchMode, setisSeedersSearchMode] = useState(true);

  return (
    <>
      <div className={styles.searchBar}>
        <BackendStatus />
        <IndexSearchBar isSeedersSearchMode={isSeedersSearchMode} />
      </div>
      <div className={styles.toggleWrapper}>
        <SearchToggle
          label="Search mode"
          boolValue={isMovieSearch}
          setBoolValue={setIsMovieSearch}
          firstString="Movie"
          secondString="Series"
        />
        <SearchToggle
          label="Search by"
          boolValue={isSeedersSearchMode}
          setBoolValue={setisSeedersSearchMode}
          firstString="Seed"
          secondString="Size"
        />
      </div>
    </>
  );
}
