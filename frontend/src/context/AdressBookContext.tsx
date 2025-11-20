import { AdressBook } from "@/types/AdressBook";
import { createContext, useContext, useState } from "react";

interface AdressBookContextType {
  adressBook: AdressBook | null;
  setAdressBook: (adressBook: AdressBook | null) => void;
}

const AdressBookContext = createContext<AdressBookContextType | null>(null);

export function AdressBookProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [adressBook, setAdressBook] = useState<AdressBook | null>(null);

  return (
    <AdressBookContext.Provider value={{ adressBook, setAdressBook }}>
      {children}
    </AdressBookContext.Provider>
  );
}

export const useAdressBook = (): AdressBookContextType => {
  const context = useContext(AdressBookContext);
  if (!context) {
    throw new Error("useAdressBook must be used within AdressBookProvider");
  }
  return context;
};
