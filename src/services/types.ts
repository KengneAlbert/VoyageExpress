export interface Point {
  id: string;
  detail?: string;
  address: string;
  city: City;
}

export interface City {
  id: string;
  name: string;
  postal_code?: string;
  country?: string;
}

export interface Trip {
  id: string;
  start_date: string;
  end_date?: string;
  number_of_passengers: number;
  price: {
    amount: number;
    currency: string;
  };
  route: {
    id: string;
    departure: Point;
    arrived: Point;
    duration?: string;
    distance?: number;
  };
  agency: {
    id: string;
    name: string;
    logo?: string;
    services: string[];
  };
  trip_type: 'VIP' | 'REGULAR';
}

export interface SearchParams {
  departure: string;
  destination: string;
  date: string;
  passengers: number;
}
