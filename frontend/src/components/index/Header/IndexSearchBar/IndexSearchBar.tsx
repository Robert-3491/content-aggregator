import styles from "./IndexSearchBar.module.css";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { useYtsMovies } from "@/context/YtsMoviesContext";
import { useGenericMovies } from "@/context/GenericMoviesContext";
import { useLoading } from "@/context/LoadingContext";
import { useSearchQuery } from "@/context/SearchQueryContext";
import { BsFillFilterCircleFill } from "react-icons/bs";

export default function IndexSearchBar({
  searchConfig,
}: {
  searchConfig: any;
}) {
  const { setGenericMovies } = useGenericMovies();
  const { setSearchQuery } = useSearchQuery();
  const { setYtsMovies } = useYtsMovies();
  const { setIsLoading } = useLoading();

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setSearchQuery(text);
  };

  const handleSearch = async () => {
    if (!searchConfig.searchQuery.trim()) return;
    setIsLoading(true);
    var response = await fetch("http://localhost:5000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchConfig),
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
      <BsFillFilterCircleFill
        className={styles.iconStyle}
        onClick={() =>
          searchConfig.setIsFiltersVisible((prev: boolean) => !prev)
        }
        style={{
          transform: searchConfig.isFiltersVisible
            ? "rotate(180deg)"
            : "rotate(0deg)",
          transition: "transform 0.2s",
        }}
      />
      <input
        type="search"
        className={styles.indexSearchBar}
        placeholder="Search"
        value={searchConfig.searchQuery}
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
