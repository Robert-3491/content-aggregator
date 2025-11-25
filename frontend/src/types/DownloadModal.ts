export interface DownloadModal {
  isVisible: boolean;
  url: string;
  title: string;
  setIsVisible: (visible: boolean) => void;
  setUrl: (url: string) => void;
  setTitle: (url: string) => void;
}
