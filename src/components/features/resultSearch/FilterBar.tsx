import React, { useState, useRef, useEffect } from 'react';
import { Filter, Clock, Building2, SortAsc, X, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterBarProps {
  onFilterChange: (filters: {
    price?: string;
    time?: string;
    agency?: string;
  }) => void;
  onSort: (type: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onSort }) => {
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<'price' | 'time' | 'agency', string>>({
    price: '',
    time: '',
    agency: ''
  });
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setActiveFilter('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filters = [
    {
      id: 'price' as const,
      label: 'Prix',
      icon: <SortAsc className="h-4 w-4" />,
      options: ['Moins cher', 'Plus cher']
    },
    {
      id: 'time' as const,
      label: 'Heure',
      icon: <Clock className="h-4 w-4" />,
      options: ['Matin', 'Après-midi', 'Soir']
    },
    {
      id: 'agency' as const,
      label: 'Agence',
      icon: <Building2 className="h-4 w-4" />,
      options: ['General Voyage', 'Finex', 'Global']
    }
  ];

  const handleOptionSelect = (filterId: 'price' | 'time' | 'agency', option: string) => {
    // Handle sorting for price filter
    if (filterId === 'price') {
      if (option === 'Moins cher') {
        onSort('price_asc');
      } else if (option === 'Plus cher') {
        onSort('price_desc');
      }
    }

    // Handle other filters
    const newFilters = {
      ...selectedFilters,
      [filterId]: option
    };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
    setActiveFilter('');
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      price: '',
      time: '',
      agency: ''
    });
    onFilterChange({});
    onSort('');
    setActiveFilter('');
  };

  const hasActiveFilters = Object.values(selectedFilters).some(value => value !== '');

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 
                   backdrop-blur-xl rounded-xl p-4 shadow-xl border border-gray-800/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory 
                        flex items-center gap-4 pr-4 relative">
            <div className="flex-none flex items-center gap-2 text-orange-400 px-3 snap-start">
              <Filter className="h-5 w-5" />
              <span className="font-medium whitespace-nowrap">Filtres</span>
            </div>

            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(activeFilter === filter.id ? '' : filter.id as 'price' | 'time' | 'agency')}
                className={`flex-none snap-start flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${activeFilter === filter.id 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20' 
                    : selectedFilters[filter.id]
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'}`}
              >
                {filter.icon}
                <span>{filter.label}</span>
                {selectedFilters[filter.id] && (
                  <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">
                    {selectedFilters[filter.id]}
                  </span>
                )}
              </motion.button>
            ))}
            
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900/90 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900/90 to-transparent pointer-events-none" />
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetFilters}
              className="ml-4 px-3 py-2 flex items-center gap-2 text-sm text-gray-400 
                       hover:text-white rounded-lg bg-gray-800/50 hover:bg-gray-700/50 
                       border border-gray-700 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Réinitialiser</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {activeFilter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setActiveFilter('')}
            />

            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            >
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl 
                            shadow-2xl border border-gray-800/50 backdrop-blur-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
                  <h3 className="text-lg font-medium text-white">
                    {filters.find(f => f.id === activeFilter)?.label}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveFilter('')}
                    className="p-2 text-gray-400 hover:text-white rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
                
                <div className="p-4 space-y-2">
                  {filters.find(f => f.id === activeFilter)?.options.map((option) => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionSelect(activeFilter as 'price' | 'time' | 'agency', option)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg 
                                transition-all duration-200
                        ${selectedFilters[activeFilter as keyof typeof selectedFilters] === option
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'text-gray-300 hover:bg-gray-800/50 border border-gray-800/50'}`}
                    >
                      {option}
                      {selectedFilters[activeFilter as keyof typeof selectedFilters] === option && (
                        <Check className="h-4 w-4" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterBar;