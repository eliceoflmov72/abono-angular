export interface Coordinate {
  latitude: string;
  longitude: string;
}

export interface Refill {
  id?: string;
  passId: string;
  company: string;
  coordinates: Coordinate[];
  name: string;
  description: string;
  image: string;
  type: string;
}
