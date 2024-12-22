import React from 'react';
import Slider from 'react-slick';
import { PARTNERS } from '../../../utils/constants';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Partners = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="py-24 bg-gray-900 overflow-hidden relative">
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-purple-600/20 to-blue-600/20 animate-gradient-x" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
            Nos <span className="text-orange-400">Partenaires</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0 transform scale-x-50 group-hover:scale-x-100 transition-transform duration-500"></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ils nous font confiance pour offrir le meilleur service de transport à leurs clients
          </p>
        </div>

        <div className="relative">
          {/* Edge fade gradients */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />
          
          <Slider {...settings} className="partner-slider -mx-4">
            {PARTNERS.map((partner, index) => (
              <div key={index} className="px-4">
                <div className="relative bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl h-48 flex items-center justify-center group transform transition-all duration-500 hover:scale-105">
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                    <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1500" />
                  </div>

                  {/* Hover effects */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-purple-600/5 rounded-xl backdrop-blur-sm" />
                    <div className="absolute inset-0 bg-gray-800/10 rounded-xl" />
                  </div>

                  {/* Partner logo */}
                  <div className="relative z-10 transform transition-all duration-500 group-hover:scale-110">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-24 w-auto filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Partner name tooltip */}
                  <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-white/80 text-sm bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      {partner.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000" />
    </section>
  );
};

export default Partners;