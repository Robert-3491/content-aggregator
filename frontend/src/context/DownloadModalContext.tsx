import { DownloadModal } from "@/types/DownloadModal";
import { createContext, useContext, useState, ReactNode } from "react";

const DownloadModalContext = createContext<DownloadModal>({
  isVisible: false,
  url: "",
  setIsVisible: () => {},
  setUrl: () => {},
});

export function DownloadModalProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState("");

  return (
    <DownloadModalContext.Provider
      value={{ isVisible, url, setIsVisible, setUrl }}
    >
      {children}
    </DownloadModalContext.Provider>
  );
}

export const useDownloadModal = () => useContext(DownloadModalContext);
