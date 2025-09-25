const { VITE_API_BASE_URL } = (import.meta as ImportMeta).env as unknown as {
  VITE_API_BASE_URL?: string;
};
const API_BASE_URL = VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const fetchTrips = async (
  departureCity: string,
  arrivalCity: string,
  date: string,
  opts?: { returnDate?: string; isRoundTrip?: boolean }
) => {
  const params = new URLSearchParams();
  params.set("departure_city", departureCity);
  params.set("arrival_city", arrivalCity);
  params.set("date", date);
  if (opts?.isRoundTrip && opts.returnDate) {
    params.set("return_date", opts.returnDate);
  }

  const url = `${API_BASE_URL}/trips/search/?${params.toString()}`;
  const response = await fetch(url);
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
