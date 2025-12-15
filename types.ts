export interface Office {
  id: string;
  name: string;
  state: string;
  city: string;
  address: string;
  website: string;
  phone: string;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export enum AppView {
  DIRECTORY = 'DIRECTORY',
  AI_LAB = 'AI_LAB'
}