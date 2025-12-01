import SearchToggle from "../../Header/SearchToggle/SearchToggle";
import styles from "./WatchlistEntry.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSearchQuery } from "@/context/SearchQueryContext";
import { useSearchMode } from "@/context/SearchModeContext";
import WatchListEntry from "@/types/WatchListEntry";

interface Props {
  onEntryAdded: (entry: WatchListEntry) => void;
}

export default function AddWatchListEntry({ onEntryAdded }: Props) {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const { isMovieSearch, setIsMovieSearch } = useSearchMode();

  const addEntry = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    const response = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: searchQuery.trim(),
        isMovie: isMovieSearch,
      }),
    });
    const newEntry = await response.json();
    onEntryAdded(newEntry);
  };

  return (
    <div className={styles.entryContainer}>
      <div className={styles.entryWrapper}>
        <IoIosAddCircleOutline
          className={styles.iconStyle}
          onClick={addEntry}
        />

        <input
          className={styles.entryInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addEntry()}
        ></input>

        <SearchToggle
          boolValue={isMovieSearch}
          setBoolValue={setIsMovieSearch}
          firstOption="Movie"
          secondOption="Series"
        />

        <IoIosAddCircleOutline
          className={styles.iconStyle}
          onClick={addEntry}
        />
      </div>
    </div>
  );
}
