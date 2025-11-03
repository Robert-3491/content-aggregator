import { useGenericMovies } from "@/context/GenericMoviesContext";
import styles from "./GenericResults.module.css";
import { GenericMovie } from "@/types/genericMovies";

export default function GenericResults() {
  const { genericMovies } = useGenericMovies();

  return (
    <div className={styles.container}>
      <h3>Other Results</h3>

      <div className={styles.movieTable}>
        {genericMovies && genericMovies.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Size</th>
                <th>Seeds</th>
              </tr>
            </thead>
            <tbody>
              {genericMovies.map((movie: GenericMovie, index: number) => (
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
