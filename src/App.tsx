import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import SearchResults from "./components/features/landingPage/SearchResults";
import Login from "./components/features/authentification/Login";
import Register from "./components/features/authentification/Register";
import AgenciesPage from "./components/features/agences/Agencies";
import Profile from "./components/features/profile/Profile";
import Contact from "./components/features/contact/Contact";
import Help from "./components/features/help/Help";
import MyTickets from "./components/features/billets/billets";
import BookingForm from "./components/features/booking/BookingForm";
import Payment from "./components/features/payment/Payment";
import DownloadApp from "./components/features/landingPage/DownloadApp";
// import PaymentSuccess from "./components/features/booking/PaymentSuccess";
// import { motion } from "framer-motion";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data after login
    // Replace this with actual API call
    setTimeout(() => {
      setUser({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        photoURL: "/default-avatar.png",
      });
    }, 1000);
  }, []);

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
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/payment" element={<Payment />} />
          {/* <Route path="/payment-success" element={<PaymentSuccess />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
