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
  id: number;
  name: string;
  description?: string;
  logo: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  routes: Route[];
}
