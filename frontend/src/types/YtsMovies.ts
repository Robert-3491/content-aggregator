export interface YTSquality {
  quality: string;
  qualityType: string;
  size: string;
  magnetURL: string;
}

export interface YTSmovie {
  title: string;
  imageURL: string;
  year: string;
  moviePageUrl: string;
  qualities: YTSquality[];
}
