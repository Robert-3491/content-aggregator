export interface DownloadModal {
  isVisible: boolean;
  url: string;
  setIsVisible: (visible: boolean) => void;
  setUrl: (url: string) => void;
}
