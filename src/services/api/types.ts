export interface City {
  id: string;
  name: string;
  postal_code?: string;
  country?: string;
}

export interface Point {
  id: string;
  detail?: string;
  address: string;
  agency?: string;
  city?: City;
}

export interface Route {
  id: string;
  description?: string;
  distance?: number;
  departure: Point;
  arrived: Point;
  duration?: string;
  image_url?: string;
}

export interface Agency {
  id: string;
  name: string;
  in_service: boolean;
  head_office?: string;
  director?: string;
  creation_date?: string;
  services: string[];
  certifications: Record<string, any>;
  opening_hours: Record<string, any>;
  fleet_size?: number;
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
  employee?: string;
  route?: string;
  trip_type: string;
}

export interface SearchParams {
  departure: string;
  destination: string;
  date: string;
  passengers: number;
}

export interface TripSearchResponse {
  id: string;
  agency: Agency;
  price: number;
  availableSeats: number;
  isVip: boolean;
  departure: {
    point: string;
    city: string;
  };
  destination: {
    point: string;
    city: string;
  };
  departureTime: string;
  arrivalTime: string;
  logo: string;
}
