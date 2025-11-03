import { createContext, useContext, useState } from "react";

const GenericMoviesContext = createContext<any>(null);

export function GenericMoviesProvider({ children }: any) {
  const [genericMovies, setGenericMovies] = useState([]);
  return (
    <GenericMoviesContext.Provider value={{ genericMovies, setGenericMovies }}>
      {children}
    </GenericMoviesContext.Provider>
  );
}

export const useGenericMovies = () => useContext(GenericMoviesContext);
