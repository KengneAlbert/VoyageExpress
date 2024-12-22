import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import SearchResults from "./components/features/landingPage/SearchResults";
import Login from "./components/features/authentification/Login";
import Register from "./components/features/authentification/Register";
import AgenciesPage from "./components/features/agences/agencies";
import Contact from "./components/features/contact/Contact";
import Help from "./components/features/help/Help";
import MyTickets from "./components/features/help/billets";
import { motion } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";

// Lazy loading des composants majeurs
const Hero = React.lazy(() => import("./components/features/landingPage/Hero"));
const BookingSteps = React.lazy(
  () => import("./components/features/landingPage/BookingSteps")
);
const TopDestinations = React.lazy(
  () => import("./components/features/landingPage/TopDestinations")
);
const Destinations = React.lazy(
  () => import("./components/features/landingPage/Destinations")
);
const Testimonials = React.lazy(
  () => import("./components/features/landingPage/Testimonials")
);
const Partners = React.lazy(
  () => import("./components/features/landingPage/Partners")
);
const Newsletter = React.lazy(
  () => import("./components/features/landingPage/Newsletter")
);
const Footer = React.lazy(() => import("./components/layout/Footer"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Hero />
                <BookingSteps />
                <TopDestinations />
                <Destinations />
                <DownloadApp />
                <Testimonials />
                <Partners />
                <Newsletter />
                <Footer />
              </Suspense>
            }
          />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/agences" element={<AgenciesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aide" element={<Help />} />
          <Route path="/mes-billets" element={<MyTickets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { useState } from "react";
import DownloadApp from "./components/features/landingPage/DownloadApp";

const SearchForm = () => {
  const [isSearching] = useState(false);

  // ... existing code ...

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl"
    >
      {/* ... existing form code ... */}
      {isSearching && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="loading loading-spinner text-orange-400" />
        </div>
      )}
    </motion.div>
  );
};

export { SearchForm };
