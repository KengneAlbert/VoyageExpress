import React, { Suspense } from "react";
import { motion } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";

// Lazy loading des composants majeurs
const Hero = React.lazy(() => import("../components/features/landingPage/Hero"));
const About = React.lazy(() => import("../components/features/landingPage/About"));
const BookingSteps = React.lazy(() => import("../components/features/landingPage/BookingSteps"));
const TopDestinations = React.lazy(
  () => import("../components/features/landingPage/TopDestinations")
);
const Destinations = React.lazy(() => import("../components/features/landingPage/Destinations"));
const Testimonials = React.lazy(() => import("../components/features/landingPage/Testimonials"));
const Partners = React.lazy(() => import("../components/features/landingPage/Partners"));
const Newsletter = React.lazy(() => import("../components/features/landingPage/Newsletter"));
const Footer = React.lazy(() => import("../components/layout/Footer"));

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<LoadingSkeleton />}>
        <Hero />
        <About />
        <BookingSteps />
        <TopDestinations />
        <Destinations />
        <Testimonials />
        <Partners />
        {/* <DownloadApp /> */}
        <Newsletter />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8 p-4">
      <div className="h-96 bg-gray-800 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-800 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
// import DownloadApp from "./components/DownloadApp";

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
