export interface UrlEntry {
  url: string;
  active: boolean;
}

export interface AdressBook {
  id: number;
  ytsUrls?: UrlEntry[];
  rarbgUrls?: UrlEntry[];
  pirateBayUrls?: UrlEntry[];
  qbitUrl?: string;
  seriesDirectories?: string[];
}
