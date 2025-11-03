import { useState } from "react";
import styles from "./IndexSearchBar.module.css";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { useYtsMovies } from "@/context/YtsMoviesContext";
import { useGenericMovies } from "@/context/GenericMoviesContext";

interface Props {
  isMovieSearch: boolean;
}

export default function IndexSearchBar({ isMovieSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const { setYtsMovies } = useYtsMovies();
  const { setGenericMovies } = useGenericMovies();

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setSearchQuery(text);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    var response = await fetch("http://localhost:5000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchQuery,
        isMovieSearch: isMovieSearch,
      }),
    });
    const data = await response.json();
    setYtsMovies(data.ytsMovies);
    setGenericMovies(data.rarbgMovies);
    console.log(data);
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
