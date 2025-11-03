import { createContext, useContext, useState } from "react";

const SearchQueryContext = createContext<any>(null);

export function SearchQueryProvider({ children }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
}

export const useSearchQuery = () => useContext(SearchQueryContext);
