import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Map } from 'lucide-react';
import '../IraqKuwaitRegion.css';

const placeholderImages = {
  iraq: 'https://www.worldatlas.com/r/w960-q80/img/flag/iq-flag.jpg',
  kuwait: 'https://www.worldatlas.com/r/w960-q80/img/flag/kw-flag.jpg',
  region: '/api/placeholder/600/400'
};

const IraqKuwait = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const countries = [
    { name: 'Iraq', description: 'A country in Western Asia, bordered by Turkey to the north, Iran to the east, Kuwait to the southeast, Saudi Arabia to the south, Jordan to the southwest and Syria to the west...' },
    { name: 'Kuwait', description: 'A country in Western Asia. Situated in the northern edge of Eastern Arabia at the tip of the Persian Gulf, it shares borders with Iraq to the north and Saudi Arabia to the south...' },
  ];

  const mapVariants = {
    closed: { opacity: 0, scale: 0.8 },
    open: { opacity: 1, scale: 1 }
  };

  const countryVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <div className="iraq-kuwait-container">
      <h1 className="main-title">Iraq-Kuwait Region Explorer</h1>

      <div className="content-wrapper">
        <div className="left-column">
          {/* <motion.button
            className="map-toggle-btn"
            onClick={() => setIsMapOpen(!isMapOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Map className="map-icon" />
            {isMapOpen ? 'Close Map' : 'Open Map'}
          </motion.button> */}

          <AnimatePresence>
            {isMapOpen && (
              <motion.div
                variants={mapVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="map-container"
              >
                <img src={placeholderImages.region} alt="Iraq-Kuwait Region" className="region-map" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="country-buttons">
            {countries.map((country) => (
              <motion.button
                key={country.name}
                className="country-btn"
                onClick={() => setSelectedCountry(country)}
                whileHover={{ scale: 1.05, backgroundColor: '#e5e7eb' }}
                whileTap={{ scale: 0.95 }}
              >
                {country.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="right-column">
          <AnimatePresence mode="wait">
            {selectedCountry && (
              <motion.div
                key={selectedCountry.name}
                variants={countryVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="country-info"
              >
                <h2 className="country-title">{selectedCountry.name}</h2>
                <img
                  src={placeholderImages[selectedCountry.name.toLowerCase()]}
                  alt={selectedCountry.name}
                  className="country-image"
                />
                <p className="country-description">{selectedCountry.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IraqKuwait;

