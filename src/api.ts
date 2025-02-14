const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchTrips = async (departureCity: string, arrivalCity: string, date: string) => {
  const response = await fetch(
    `${API_BASE_URL}/trips/search/?departure_city=${departureCity}&arrival_city=${arrivalCity}&date=${date}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch trips");
  }
  return response.json();
};

// export const bookTrip = async (data: any) => {
//   const response = await fetch(`${API_BASE_URL}/reserver_voyage/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) {
//     throw new Error("Failed to book trip");
//   }
//   return response.json();
// };
