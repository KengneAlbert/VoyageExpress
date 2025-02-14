import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResultForm from './SearchResultForm';
import FilterBar from './FilterBar';
import TripCard from './TripResultCard';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log('Location state:', location.state);
    if (!location.state?.searchParams) {
      console.log('No search params found, redirecting to home');
      navigate('/');
      return;
    }

    const searchParams = location.state.searchParams;
    console.log('Search params:', searchParams);
    
    // Simuler un chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  // ...rest of the component...
};

export default SearchResults;
