import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navigationItems = [
  { path: '/', label: 'Accueil' },
  { path: '/agences', label: 'Agences' },
  { path: '/mes-billets', label: 'Mes Billets' },
  { path: '/contact', label: 'Contact' },
  { path: '/aide', label: 'Aide' }
];

const Navigation = ({ isMobile = false }: { isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <motion.nav 
        className="md:hidden py-4 space-y-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
      >
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 text-gray-300 transition-colors duration-200
              ${isActive ? 'text-orange-400' : 'hover:text-white hover:bg-gray-800'} 
              rounded-md`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </motion.nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `text-sm font-medium relative group
            ${isActive ? 'text-orange-400' : 'text-gray-300 hover:text-white'}
            transition-colors duration-200`
          }
        >
          {item.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 
                         transition-all duration-300 group-hover:w-full" />
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;