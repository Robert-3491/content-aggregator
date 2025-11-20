import WatchListEntry from "@/types/WatchListEntry";
import styles from "./WatchlistEntry.module.css";
import { useState } from "react";
import SearchToggle from "../../Header/SearchToggle/SearchToggle";

import { IoIosRemoveCircleOutline } from "react-icons/io";
import { HiSearch } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { VscDiscard } from "react-icons/vsc";

import { useSearchQuery } from "@/context/SearchQueryContext";
import { useSearchMode } from "@/context/SearchModeContext";

interface Props {
  entry: WatchListEntry;
  onRemove: (id: number) => void;
  onUpdate: (id: number, title: string, isMovie: boolean) => void;
}

export default function WatchlistEntry({ entry, onRemove, onUpdate }: Props) {
  const [watchlistTitle, setWatchlistTitle] = useState(entry.title);
  const [isEntryMovie, setIsEntryMovie] = useState(entry.isMovie);

  const { setSearchQuery } = useSearchQuery();
  const { setIsMovieSearch } = useSearchMode();

  return (
    <div className={styles.entryContainer}>
      <div className={styles.entryWrapper}>
        <IoIosRemoveCircleOutline
          className={styles.iconStyle}
          onClick={() => onRemove(entry.id)}
        />

        <input
          className={styles.entryInput}
          value={watchlistTitle}
          onChange={(e) => setWatchlistTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onUpdate(entry.id, watchlistTitle.trim(), isEntryMovie);
            }
          }}
        ></input>
        <p className={styles.timeCell}>
          {new Date(entry.lastSearch).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <SearchToggle
          boolValue={isEntryMovie}
          setBoolValue={setIsEntryMovie}
          firstOption="Movie"
          secondOption="Series"
        />

        <HiSearch
          className={styles.iconStyle}
          onClick={async () => {
            setSearchQuery(entry.title);
            setIsMovieSearch(entry.isMovie);
            setWatchlistTitle(entry.title);
            await onUpdate(entry.id, entry.title, entry.isMovie);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>

      {/* Display save & discard if changes made */}
      <div
        className={`${styles.saveOrDiscardWrapper} ${
          entry.title !== watchlistTitle.trim() ||
          entry.isMovie !== isEntryMovie
            ? styles.visible
            : ""
        }`}
      >
        <div
          className={styles.saveDiscardButton}
          onClick={() =>
            onUpdate(entry.id, watchlistTitle.trim(), isEntryMovie)
          }
        >
          <IoIosCheckmarkCircleOutline className={styles.iconStyle} />
        </div>

        <div
          className={styles.saveDiscardButton}
          onClick={() => {
            setWatchlistTitle(entry.title);
            setIsEntryMovie(entry.isMovie);
          }}
        >
          <VscDiscard className={styles.iconStyle} />
        </div>
      </div>
    </div>
  );
}
