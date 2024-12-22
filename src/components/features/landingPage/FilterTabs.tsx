import { useState } from "react";

export default function FilterTabs() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filters = [
    { id: "all", label: "Tous" },
    { id: "agency", label: "Agence" },
    { id: "price", label: "Prix" },
    { id: "departure", label: "Heure départ" },
    { id: "arrival", label: "Heure arrivée" },
  ];

  return (
    <div className="mb-6">
      <div className="flex overflow-x-auto scrollbar-hide space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeFilter === filter.id 
                ? "bg-orange-500 text-white" 
                : "bg-gray-800 text-gray-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}