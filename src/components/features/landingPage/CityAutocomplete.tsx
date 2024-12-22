import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { CITIES } from '../../../utils/constants';

interface CityAutocompleteProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({
  placeholder,
  value,
  onChange,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleCitySelect = (city: string) => {
    setSearchTerm(city);
    onChange(city);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {isOpen && filteredCities.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCities.map((city) => (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 focus:outline-none"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;