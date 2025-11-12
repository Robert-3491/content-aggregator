import { useGenericMovies } from "@/context/GenericMoviesContext";
import styles from "./GenericResults.module.css";
import { GenericMovie } from "@/types/genericMovies";
import { useState } from "react";

export default function GenericResults() {
  const { genericMovies } = useGenericMovies();
  const [sortBy, setSortBy] = useState<"size" | "seeders">("seeders");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (column: "size" | "seeders") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const sortedMovies = [...(genericMovies || [])].sort((a, b) => {
    if (!sortBy) return 0;

    let compareValue = 0;

    if (sortBy === "seeders") {
      compareValue = a.seeders - b.seeders;
    } else if (sortBy === "size") {
      const sizeA = parseFloat(a.size);
      const sizeB = parseFloat(b.size);
      compareValue = sizeA - sizeB;
    }

    return sortOrder === "asc" ? compareValue : -compareValue;
  });

  return (
    <div className={styles.genericContainer}>
      <h3>Other Results</h3>

      <div className={styles.movieTable}>
        {genericMovies && genericMovies.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th
                  onClick={() => handleSort("size")}
                  style={{ cursor: "pointer" }}
                >
                  Size{sortBy === "size" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => handleSort("seeders")}
                  style={{ cursor: "pointer" }}
                >
                  Seeds
                  {sortBy === "seeders" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedMovies.map((movie: GenericMovie, index: number) => (
                <tr key={index}>
                  <td>{movie.title}</td>
                  <td>{movie.size}</td>
                  <td>{movie.seeders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
}
