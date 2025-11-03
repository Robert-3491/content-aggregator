import { createContext, useContext, useState } from "react";

const SearchModeContext = createContext<any>(null);

export function SearchModeProvider({ children }: any) {
  const [isMovieSearch, setIsMovieSearch] = useState(true);
  return (
    <SearchModeContext.Provider value={{ isMovieSearch, setIsMovieSearch }}>
      {children}
    </SearchModeContext.Provider>
  );
}

export const useSearchMode = () => useContext(SearchModeContext);
