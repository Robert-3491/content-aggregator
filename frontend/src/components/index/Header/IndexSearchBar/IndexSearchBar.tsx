import styles from "./IndexSearchBar.module.css";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { useYtsMovies } from "@/context/YtsMoviesContext";
import { useGenericMovies } from "@/context/GenericMoviesContext";
import { useSearchMode } from "@/context/SearchModeContext";
import { useLoading } from "@/context/LoadingContext";
import { useSearchQuery } from "@/context/SearchQueryContext";

interface Props {
  isSeedersSearchMode: boolean;
}

export default function IndexSearchBar({ isSeedersSearchMode }: Props) {
  const { isMovieSearch } = useSearchMode();
  const { setGenericMovies } = useGenericMovies();
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const { setYtsMovies } = useYtsMovies();
  const { setIsLoading } = useLoading();

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setSearchQuery(text);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    var response = await fetch("http://localhost:5000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchQuery,
        isMovieSearch: isMovieSearch,
        isSeedersSearchMode: isSeedersSearchMode,
      }),
    });
    const data = await response.json();
    setYtsMovies(data.ytsMovies);
    setGenericMovies(data.genericResponse);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <form
      className={styles.indexForm}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <input
        type="search"
        className={styles.indexSearchBar}
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <HiOutlineClipboardCopy
        className={styles.iconStyle}
        onClick={handlePaste}
      />
      <HiSearch className={styles.iconStyle} onClick={handleSearch} />
    </form>
  );
}
