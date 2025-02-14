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
import AgencyDetails from "./components/features/agences/AgencyDetails";
import PaymentSuccess from "./components/features/payment/PaymentSuccess";
import TouristDestinations from "./components/features/destinations/Destinations";
import DestinationDetails from "./components/features/destinations/DestinationDetails";
import "react-lazy-load-image-component/src/effects/blur.css";
import About from "./components/features/landingPage/About";

// Lazy loading des composants majeurs
const Hero = React.lazy(() => import("./components/features/landingPage/Hero"));
const BookingSteps = React.lazy(
  () => import("./components/features/landingPage/BookingSteps")
);
const TopDestinations = React.lazy(
  () => import("./components/features/landingPage/TopDestinations")
);
const LandingDestinations = React.lazy(
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

interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
}

const DestinationRoutes = () => (
  <Routes>
    <Route path="/" element={<TouristDestinations />} />
    <Route path="/:id" element={<DestinationDetails />} />
  </Routes>
);

function App() {
  const [user, setUser] = useState<User | null>(null);

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
                <About />
                <BookingSteps />
                <TopDestinations />
                <LandingDestinations />
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
          <Route path="/agences/:id" element={<AgencyDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aide" element={<Help />} />
          <Route path="/mes-billets" element={<MyTickets />} />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <div>Loading...</div>}
          />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/payment-success"
            element={<PaymentSuccess replace={true} />}
          />
          <Route path="/destinations/*" element={<DestinationRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
