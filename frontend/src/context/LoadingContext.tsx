import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<any>(null);

export function LoadingProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
