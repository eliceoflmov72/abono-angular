export interface Data {
  company: string;
  coordinates: Array<{ latitude: string, longitude: string }>;
  name: string;
  description: string;
  valid_period: { start_date: string, end_date: string };
  price: number;
  image: string;
  type: string;
}
