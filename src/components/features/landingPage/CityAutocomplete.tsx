import React, { useState, useEffect, useRef } from 'react';
import { useGetCitiesQuery } from '../../../services/api/voyagesApi';

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({
  value,
  onChange,
  placeholder,
  icon,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: cities = {results: []}, isLoading } = useGetCitiesQuery();

  const filteredCities = cities?.results.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full h-[42px] pl-10 pr-4 rounded-lg bg-gray-800/50
                     border text-white placeholder-gray-400
                     focus:outline-none focus:ring-2 transition-colors
                     ${error ? 'border-red-500 focus:ring-red-500' : 
                              'border-white/20 focus:ring-orange-400 hover:border-orange-400'}`}
        />
      </div>

      {error && (
        <div className="absolute -bottom-6 left-0 text-sm text-red-500">
          {error}
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-900 rounded-lg shadow-xl
                      border border-gray-800 max-h-60 overflow-auto">
          {isLoading ? (
            <div className="p-2 text-gray-400 text-center">Chargement...</div>
          ) : filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  setSearchTerm(city.name);
                  onChange(city.name);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-800
                         transition-colors cursor-pointer"
              >
                {city.name}
              </button>
            ))
          ) : (
            <div className="p-2 text-gray-400 text-center">
              Aucune ville trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;