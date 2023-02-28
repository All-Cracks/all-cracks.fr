export type APIGame = {
  _id: string;
  name: string;
  release: string;
  releaseDate: string;
  lastUpdate: string;
  lastUpdateDate: string;
  description?: string;
  tutorial?: string;
  bgUrl?: string;
  coverUrl?: string;
  videoId?: string;
  crackDlLink?: string;
  crackDlSize?: string;
  crackDlLinkType?: string;
  isOnline?: string;
  additionalLinks?: AdditionnalLink[];
};

type AdditionnalLink = {
  _id: string;
  name: string;
  link: string;
  linkType: 'rar' | 'torrent';
};

export type APIResponse = {
  success: boolean;
  games: APIGame[];
  message: string;
};
