export interface Coordinate {
  latitude: string;
  longitude: string;
}

export interface ValidPeriod {
  start_date: string;
  end_date: string;
}

export interface Pass {
  id?: string;
  company: string;
  coordinates: Coordinate[];
  name: string;
  description: string;
  valid_period: ValidPeriod;
  price: number;
  image: string;
  type: string;
}
