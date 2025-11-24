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

// Helper to parse backend response
export const parseAdressBook = (data: any): AdressBook => ({
  ...data,
  ytsUrls: data.ytsUrls ? JSON.parse(data.ytsUrls) : [],
  rarbgUrls: data.rarbgUrls ? JSON.parse(data.rarbgUrls) : [],
  pirateBayUrls: data.pirateBayUrls ? JSON.parse(data.pirateBayUrls) : [],
  seriesDirectories: data.seriesDirectories
    ? JSON.parse(data.seriesDirectories)
    : [],
});

// Helper to convert to backend format
export const stringifyAdressBook = (data: AdressBook): any => ({
  ...data,
  ytsUrls: data.ytsUrls ? JSON.stringify(data.ytsUrls) : null,
  rarbgUrls: data.rarbgUrls ? JSON.stringify(data.rarbgUrls) : null,
  pirateBayUrls: data.pirateBayUrls ? JSON.stringify(data.pirateBayUrls) : null,
  seriesDirectories: data.seriesDirectories
    ? JSON.stringify(data.seriesDirectories)
    : null,
});
