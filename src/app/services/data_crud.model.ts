export interface Coordinate {
    latitude: string;
    longitude: string;
  }
  
  export interface ValidPeriod {
    start_date: string;
    end_date: string;
  }
  
  export interface Data {
    _id?: string; // El campo _id es opcional ya que MongoDB lo genera automáticamente
    company: string;
    coordinates: Coordinate[];
    name: string;
    description: string;
    valid_period: ValidPeriod;
    price: number;
    image: string;
    type: string;
  }
  