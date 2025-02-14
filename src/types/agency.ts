export interface Route {
  id: number;
  from: string;
  to: string;
  price: number;
  duration: string;
  frequency: string;
  departureTime: string[];
  isPopular?: boolean;
}

export interface Agency {
  // ...existing agency interface...
  routes: Route[];
}
