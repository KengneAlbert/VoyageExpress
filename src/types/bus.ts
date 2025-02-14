export interface Bus {
  id: number;
  company: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  seatsAvailable: number;
  type: string;
  amenities: string[];
  logo?: string; // Ajout du logo
}
