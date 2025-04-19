import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Download,
  Printer,
  Bus,
  CheckCircle,
  Shield,
  Info,
  Share2,
  Home,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react"; // Modifié ici pour utiliser QRCodeSVG au lieu de QRCode
import html2canvas from "html2canvas";
import Logo from "../../../assets/logove.jpg"; // Ajoutez le chemin correct vers votre logo
import jsPDF from "jspdf";
import { useNotifications } from "../../../context/NotificationsContext";

interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
}

interface TripDetails {
  logo: string;
  agency: string;
  departure: {
    city: string;
  };
  destination: {
    city: string;
  };
  date: string;
  departureTime: string;
}

interface BookingData {
  trip: TripDetails;
  passengers: Passenger[];
  selectedSeats: string[];
  totalPrice: number;
}

// Ajout des éléments de sécurité
const SecurityPattern = () => (
  <div className="absolute inset-0 pointer-events-none select-none opacity-[0.08]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
        repeating-linear-gradient(120deg, 
          transparent 0, 
          transparent 20px, 
          rgba(255,138,76,0.1) 20px, 
          rgba(255,138,76,0.1) 40px
        ),
        repeating-linear-gradient(-120deg,
          transparent 0,
          transparent 20px,
          rgba(255,255,255,0.1) 20px,
          rgba(255,255,255,0.1) 40px
        )
      `,
      }}
    />
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute text-[6px] font-bold text-gray-600 transform -rotate-45 select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15,
          }}
        >
          VoyageExpress
        </div>
      ))}
    </div>
  </div>
);

const Watermark = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none">
    <div className="text-[150px] font-black text-white/80 transform -rotate-30 tracking-widest">
      VoyageExpress
    </div>
  </div>
);

const GuillochePattern = () => (
  <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden">
    <div className="w-full h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          repeating-linear-gradient(45deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.2) 2px,
            rgba(0,0,0,0.2) 4px
          )
        `,
        }}
      />
    </div>
  </div>
);

const PaymentSuccess = () => {
  const { showNotification } = useNotifications();
  const ticketRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state?.bookingData) {
    navigate("/");
    return null;
  }

  const { bookingData } = location.state as { bookingData: BookingData };

  const handleDownload = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current);
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "ticket.png";
      link.href = url;
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      if (ticketRef.current) {
        // Afficher une notification de chargement
        showNotification("Génération du PDF en cours...", "info");

        const canvas = await html2canvas(ticketRef.current, {
          scale: 2,
          logging: false,
          useCORS: true,
          backgroundColor: "#111827", // Correspond à bg-gray-900
        });

        const imgWidth = 210; // A4 width in mm
        // const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF("p", "mm", "a4");

        // Ajouter le logo et les informations de l'entreprise
        pdf.setFontSize(20);
        pdf.setTextColor(40, 40, 40);
        pdf.text("VoyageExpress", 105, 15, { align: "center" });

        // Ajouter la date et le numéro de référence
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(
          `Date d'émission : ${new Date().toLocaleDateString("fr-FR")}`,
          20,
          25
        );
        pdf.text(
          `Réf : ${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          20,
          30
        );

        // Ajouter l'image du ticket
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          40,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );

        // Ajouter un pied de page
        // const pageCount = pdf.internal.getNumberOfPages();
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          "Ce document est un billet électronique officiel de VoyageExpress.",
          105,
          285,
          { align: "center" }
        );
        // pdf.text(`Page ${pageCount}`, 105, 290, { align: "center" });

        // Télécharger le PDF
        pdf.save(`billet-voyage-${new Date().getTime()}.pdf`);

        showNotification(
          "Votre billet a été téléchargé avec succès!",
          "success"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      showNotification("Erreur lors de la génération du PDF", "error");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      // Convertir la date en format local
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // Si la date est invalide, retourner la date actuelle
        return new Date().toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }
      return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-orange-900/20 via-gray-900 to-gray-900 py-4 sm:py-8 md:pt-20 lg:pt-24 px-3 sm:px-4"
    >
      <div className="max-w-3xl mx-auto">
        {/* Success Message - Plus compact sur mobile */}
        <motion.div className="text-center mb-4 sm:mb-8 relative">
            <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
            ></motion.div>
          <div
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full 
                         bg-gradient-to-br from-green-400/20 to-green-500/20 mb-3 sm:mb-4"
          >
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">
            Paiement réussi !
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto px-4">
            Votre billet a été généré avec succès
          </p>
        </motion.div>

        {/* Ticket Container - Ajustements pour mobile */}
        <div ref={ticketRef} className="relative">
          {/* Ajout des nouveaux éléments de sécurité */}
          <SecurityPattern />
          <Watermark />
          <GuillochePattern />

          {/* Effet de brillance holographique */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
              backgroundSize: "200% 200%",
              animation: "shimmer 3s infinite",
            }}
          />

          {/* Hologramme rond avec animation */}
          <div className="absolute top-4 sm:top-6 right-12 sm:right-20 w-12 h-12 sm:w-20 sm:h-20">
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20
                            animate-spin-slow border border-white/10"
              />
              <div className="absolute inset-2 rounded-full bg-gray-900/90 flex items-center justify-center">
                <span className="text-xs font-bold text-orange-500 tracking-wider">
                  SECURE
                </span>
              </div>
            </div>
          </div>

          {/* Share button overlay */}
          <div className="absolute -top-4 -right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 
                       transition-colors text-white"
              onClick={() => {
                // Add share functionality
                if (navigator.share) {
                  navigator.share({
                    title: "Mon billet de voyage",
                    text: `Voyage de ${bookingData.trip.departure.city} à ${bookingData.trip.destination.city}`,
                    url: window.location.href,
                  });
                }
              }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>

          {/* ...rest of the ticket content... */}
          <div
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                     backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/10 
                     shadow-xl overflow-hidden relative"
          >
            {/* Ticket Holes avec effet de perforation */}
            <div
              className="absolute top-1/2 -left-4 w-8 h-8 bg-gray-900 rounded-full transform -translate-y-1/2
                         before:absolute before:inset-1 before:bg-gray-800 before:rounded-full"
            />
            <div
              className="absolute top-1/2 -right-4 w-8 h-8 bg-gray-900 rounded-full transform -translate-y-1/2
                         before:absolute before:inset-1 before:bg-gray-800 before:rounded-full"
            />

            {/* Bandeau supérieur avec motif */}
            <div
              className="h-2 bg-gradient-to-r from-orange-500 to-orange-600 
                         relative overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] 
                           bg-[length:10px_10px]"
              />
            </div>

            {/* Header avec effet glassmorphism */}
            <div className="p-3 sm:p-6 border-b border-white/10">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <img
                    src={bookingData.trip.logo}
                    alt={bookingData.trip.agency}
                    className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-base sm:text-xl font-bold text-white">
                      {bookingData.trip.agency}
                    </h2>
                    <div className="flex items-center gap-1 sm:gap-2 text-orange-400">
                      <Bus className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">
                        N°{" "}
                        {Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Logo modifié avec un meilleur rendu */}
                <div className="hidden sm:block relative w-12 h-12 sm:w-14 sm:h-14">
                  <div
                    className="absolute inset-0 rounded-full 
                                bg-gradient-to-br from-gray-800 to-gray-900 
                                border-2 border-orange-500/20 shadow-lg shadow-orange-500/10"
                  />
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img
                      src={Logo}
                      alt="VE Transport"
                      className="w-full h-full object-cover scale-[1.2] opacity-90"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
              {/* Trip Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Trajet</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg font-medium text-white">
                    <span>{bookingData.trip.departure.city}</span>
                    <div className="h-px w-12 bg-gradient-to-r from-orange-500 to-orange-600" />
                    <span>{bookingData.trip.destination.city}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Date et Heure</span>
                  </div>
                  <p className="text-lg font-medium text-white">
                    {formatDate(bookingData.trip.date)}
                    <span className="text-orange-400 mx-2">•</span>
                    {bookingData.trip.departureTime}
                  </p>
                </div>
              </div>

              {/* Passengers */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <User className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">
                    Passagers et Places
                  </span>
                </div>
                <div className="grid gap-3 sm:gap-4">
                  {bookingData.passengers.map(
                    (passenger: Passenger, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between 
                                  p-3 sm:p-4 bg-gray-800/30 rounded-lg sm:rounded-xl 
                                  border border-gray-700/50"
                      >
                        <div className="space-y-1 mb-2 sm:mb-0">
                          <p className="text-sm sm:text-base text-white font-medium">
                            {passenger.firstName} {passenger.lastName}
                          </p>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                            <span>CNI:</span>
                            <span>{passenger.idNumber}</span>
                          </div>
                        </div>
                        <span
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500/10 
                                    text-orange-400 rounded-lg font-medium text-xs sm:text-sm
                                    border border-orange-500/20 self-start sm:self-center"
                        >
                          Siège {bookingData.selectedSeats[index]}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Informations importantes */}
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-orange-400" />
                  <h4 className="font-medium text-orange-400">
                    Informations importantes
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Présentez-vous 30 minutes avant le départ</li>
                  <li>• Munissez-vous d'une pièce d'identité valide</li>
                  <li>• Bagage en soute limité à 20kg</li>
                </ul>
              </div>

              {/* QR Code Section - Recentré et amélioré */}
              <div className="flex items-center justify-center py-6 sm:py-8">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center">
                  <div className="flex justify-center">
                    <QRCodeSVG
                      value={JSON.stringify({
                        ticketId: Math.random()
                          .toString(36)
                          .substr(2, 9)
                          .toUpperCase(),
                        trip: `${bookingData.trip.departure.city}-${bookingData.trip.destination.city}`,
                        date: new Date().toISOString(),
                      })}
                      size={140}
                      level="H"
                      includeMargin
                      className="mx-auto"
                    />
                  </div>
                  <div className="text-center mt-4 space-y-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      Scannez pour vérifier
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Présentez ce QR code lors de l'embarquement
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-3 py-2 sm:px-6 sm:py-4 bg-gray-900/50 border-t border-gray-700/50">
              <div
                className="flex flex-col sm:flex-row items-center justify-between 
                            text-[10px] sm:text-xs text-gray-400 gap-2 sm:gap-0"
              >
                <span>Ce billet est personnel et non transmissible</span>
                <span className="font-mono">{`${new Date().getFullYear()}${Math.random()
                  .toString(36)
                  .substr(2, 9)
                  .toUpperCase()}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions with improved layout and animations */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4 sm:mt-8 px-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadPDF}
            className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 
                     rounded-xl flex items-center justify-center gap-3 text-white font-medium
                     shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Télécharger en PDF</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-4 bg-gradient-to-br from-gray-700 to-gray-800 
                     rounded-xl flex items-center justify-center gap-3 text-white font-medium
                     shadow-lg hover:shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all"
          >
            <Printer className="w-5 h-5" />
            <span>Imprimer le billet</span>
          </motion.button>
        </div>

        {/* Additional helpful information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 sm:mt-8 p-3 sm:p-4 bg-gray-800/50 rounded-lg sm:rounded-xl 
                            border border-gray-700/50 text-center mx-2 sm:mx-0"
        >
          <p className="text-xs sm:text-sm text-gray-400">
            Un exemplaire de votre billet a été envoyé à votre adresse email.
            <br className="hidden sm:block" />
            Pour toute assistance, contactez notre service client.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
