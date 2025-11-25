import { DownloadModal } from "@/types/DownloadModal";
import { createContext, useContext, useState, ReactNode } from "react";

const DownloadModalContext = createContext<DownloadModal>({
  isVisible: false,
  url: "",
  setIsVisible: () => {},
  setUrl: () => {},
  title: "",
  setTitle: () => {},
});

export function DownloadModalProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  return (
    <DownloadModalContext.Provider
      value={{ isVisible, url, setIsVisible, setUrl, setTitle, title }}
    >
      {children}
    </DownloadModalContext.Provider>
  );
}

export const useDownloadModal = () => useContext(DownloadModalContext);
