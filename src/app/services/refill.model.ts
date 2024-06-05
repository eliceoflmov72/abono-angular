export interface Coordinate {
  latitude: string;
  longitude: string;
}

export interface ValidPeriod {
  start_date: string;
  end_date: string;
}

export interface Refill {
  id?: string;
  passId: string;
  company: string;
  coordinates: Coordinate[];
  name: string;
  description: string;
  valid_period: ValidPeriod;
  image: string;
  type: string;
}
