import { motion } from "framer-motion";

const DownloadApp = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Téléchargez notre application mobile
            </h2>
            <p className="text-gray-400">
              Réservez vos billets de bus en quelques clics, où que vous soyez !
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Play Store Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center justify-center bg-white/10 hover:bg-white/20 
                         backdrop-blur-md rounded-xl px-6 py-3"
              >
                <img
                  src="src\statics\images\playstore.png"
                  alt="Get it on Play Store"
                  className="h-8"
                />
              </motion.a>

              {/* App Store Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center justify-center bg-white/10 hover:bg-white/20 
                         backdrop-blur-md rounded-xl px-6 py-3"
              >
                <img
                  src="src\statics\images\appstore.png"
                  alt="Download on App Store"
                  className="h-8"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="src\statics\images\phone_mockup.png"
                alt="VoyageExpress Mobile App"
                className="w-full max-w-[300px] mx-auto"
              />
            </div>
            {/* Background Gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/20 
                          to-purple-500/20 blur-3xl rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
