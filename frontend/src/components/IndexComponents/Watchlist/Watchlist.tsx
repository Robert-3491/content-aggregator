import { useEffect, useState } from "react";
import styles from "./Watchlist.module.css";
import WatchListEntry from "@/types/WatchListEntry";
import WatchlistEntry from "./WatchlistEntry/WatchlistEntry";
import AddWatchListEntry from "./WatchlistEntry/AddWatchListEntry";

export default function Watchlist() {
  const [watchlistData, setWatchlistData] = useState<WatchListEntry[]>([]);
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch("/api/watchlist");
        const data = await response.json();
        setWatchlistData(data);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
        setTimeout(fetchWatchlist, 2000);
      }
    };
    fetchWatchlist();
  }, []);

  const removeEntry = async (id: number) => {
    await fetch(`/api/watchlist/${id}`, {
      method: "DELETE",
    });
    setWatchlistData(watchlistData.filter((entry) => entry.id !== id));
  };

  const updateEntry = async (id: number, title: string, isMovie: boolean) => {
    const response = await fetch(`/api/watchlist/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isMovie }),
    });
    const updatedEntry: WatchListEntry = await response.json();
    setWatchlistData(
      watchlistData.map((entry) => (entry.id === id ? updatedEntry : entry))
    );
  };

  return (
    <div className={styles.watchlistContainer}>
      <h3>Watchlist</h3>

      <div className={styles.watchlistWrapper}>
        <AddWatchListEntry
          onEntryAdded={(newEntry) =>
            setWatchlistData([newEntry, ...watchlistData])
          }
        />
        {watchlistData.map((entry: WatchListEntry) => (
          <WatchlistEntry
            entry={entry}
            key={entry.id}
            onRemove={removeEntry}
            onUpdate={updateEntry}
          />
        ))}
      </div>
    </div>
  );
}
