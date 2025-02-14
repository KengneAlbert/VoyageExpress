import React, { useState } from "react";

const SearchTrips = () => {
  const [trips, setTrips] = useState([]);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [date, setDate] = useState("");

  const fetchTrips = async () => {
    if (!departureCity || !arrivalCity || !date) {
      alert("Veuillez remplir tous les champs ooo !");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/trips/search/?departure_city=${departureCity}&arrival_city=${arrivalCity}&date=${date}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Données reçues :", data);
        setTrips(data.results); // Utilise `results` pour extraire les voyages
      } else {
        console.error(
          "Erreur lors de la récupération des voyages :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur de connexion au serveur", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rechercher un voyage</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Ville de départ"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Ville d'arrivée"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          onClick={fetchTrips}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Rechercher
        </button>
      </div>

      {/* Affichage des résultats */}
      <div className="mt-6">
        {trips.length === 0 ? (
          <p>Aucun voyage trouvé</p>
        ) : (
          trips.map((trip) => (
            <div
              key={trip.id}
              className="border border-gray-300 p-4 rounded mb-4"
            >
              <h2 className="text-lg font-semibold">
                Trajet : {trip.route_details.description}
              </h2>
              <p>
                <strong>Prix :</strong> {trip.price} FCFA
              </p>
              <p>
                <strong>Départ :</strong>{" "}
                {trip.route_details.departure_details.detail} -{" "}
                {trip.route_details.departure_details.address}
              </p>
              <p>
                <strong>Arrivée :</strong>{" "}
                {trip.route_details.arrived_details.detail} -{" "}
                {trip.route_details.arrived_details.address}
              </p>
              <p>
                <strong>Date et heure de départ :</strong>{" "}
                {new Date(trip.start_date).toLocaleString()}
              </p>
              <p>
                <strong>Date et heure d'arrivée :</strong>{" "}
                {new Date(trip.end_date).toLocaleString()}
              </p>
              <p>
                <strong>Durée :</strong> {trip.trip_time} minutes
              </p>
              <p>
                <strong>Nombre de passagers :</strong>{" "}
                {trip.number_of_passengers}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchTrips;
