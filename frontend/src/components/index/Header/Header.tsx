import BackendStatus from "./BackendStatus/BackendStatus";
import IndexSearchBar from "./IndexSearchBar/IndexSearchBar";
import styles from "./Header.module.css";
import SearchToggle from "./SearchToggle/SearchToggle";
import { useSearchMode } from "@/context/SearchModeContext";
import { useState } from "react";

export default function Header() {
  const { isMovieSearch, setIsMovieSearch } = useSearchMode();
  const [isSeedersSearchMode, setisSeedersSearchMode] = useState(true);
  const [onePageSearch, setOnePageSearch] = useState(true);

  const [removeEpisodes, setRemoveEpisodes] = useState(true);
  const [removeNoSeeds, setRemoveNoSeeds] = useState(true);
  const [noLowQuality, setNoLowQuality] = useState(true);

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.searchBar}>
        <BackendStatus />
        <IndexSearchBar
          isSeedersSearchMode={isSeedersSearchMode}
          isFiltersVisible={isFiltersVisible}
          setIsFiltersVisible={setIsFiltersVisible}
        />
      </div>

      {isFiltersVisible && (
        <div className={styles.toggleContainer}>
          <div className={styles.toggleWrapper}>
            <SearchToggle
              label="Search mode"
              boolValue={isMovieSearch}
              setBoolValue={setIsMovieSearch}
              firstOption="Movie"
              secondOption="Series"
            />
            <SearchToggle
              label="Search by"
              boolValue={isSeedersSearchMode}
              setBoolValue={setisSeedersSearchMode}
              firstOption="Seed"
              secondOption="Size"
            />
            <SearchToggle
              label="Pages to search"
              boolValue={onePageSearch}
              setBoolValue={setOnePageSearch}
              firstOption="1"
              secondOption="2"
            />
          </div>

          <div className={styles.toggleWrapper}>
            <SearchToggle
              label="Remove episodes"
              boolValue={removeEpisodes}
              setBoolValue={setRemoveEpisodes}
              firstOption="Yes"
              secondOption="No"
            />
            <SearchToggle
              label="Remove 0 Seeds"
              boolValue={removeNoSeeds}
              setBoolValue={setRemoveNoSeeds}
              firstOption="Yes"
              secondOption="No"
            />
            <SearchToggle
              label="Remove 480 & 720p"
              boolValue={noLowQuality}
              setBoolValue={setNoLowQuality}
              firstOption="Yes"
              secondOption="No"
            />
          </div>
        </div>
      )}
    </div>
  );
}
