import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Map } from 'lucide-react';
import '../IraqKuwaitRegion.css';
import Gallery from '../components/Gallery';
const placeholderImages = {
  iraq: 'https://www.worldatlas.com/r/w960-q80/img/flag/iq-flag.jpg',
  kuwait: 'https://www.worldatlas.com/r/w960-q80/img/flag/kw-flag.jpg',
  region: require("../assets/region.png")
};

function Image(id) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <section>
      <motion.div
        initial={false}
        animate={
          isLoaded && isInView
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsInView(true)}
      >
        <img src={`/${id}.jpg`} alt="" onLoad={() => setIsLoaded(true)} />
      </motion.div>
    </section>
  );
}

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;
const IraqKuwait = ({ goToNextPage }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  const countries = [
    { name: 'Iraq', description: 'A country in Western Asia, bordered by Turkey to the north, Iran to the east, Kuwait to the southeast, Saudi Arabia to the south, Jordan to the southwest and Syria to the west...' },
    { name: 'Kuwait', description: 'A country in Western Asia. Situated in the northern edge of Eastern Arabia at the tip of the Persian Gulf, it shares borders with Iraq to the north and Saudi Arabia to the south...' },
  ];
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

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
      <h1 className="main-title">Iraq & Kuwait</h1>

      <div className="content-wrapper">
        <div className="left-column">
       

          <AnimatePresence>
              <motion.div
                variants={mapVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="map-container"
              >
                <img src={placeholderImages.region} alt="Iraq-Kuwait Region" className="region-map" />
              </motion.div>
          
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
      <main className="bio-section">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            Bad Relationship
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="bio-content"
          >
            <p>
              Saddam Hussein was born in Al-Awja, Iraq, on April 28, 1937. He
              served as the fifth President of Iraq from July 16, 1979, until
              April 9, 2003. He was a member of the Arab Socialist
              Ba'ath Party and the Baghdad-based Ba'ath Party, which was a
              mix of Arab nationalism and socialism.
            </p>
            <p>
              blah blah blah balh balh blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah balh balh blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah balh balh blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah

            </p>
            <p>
              blah blah blah balh balh blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah balh balh blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah balh balh blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah

            </p>
          </motion.div>






    <>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image id={image} />
      ))}
    </>
  

           <button onClick={goToNextPage}>
                how it works then
          </button> 
        </main>
    </div>
  );
};

export default IraqKuwait;

