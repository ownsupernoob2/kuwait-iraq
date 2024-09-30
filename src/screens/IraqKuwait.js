import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../IraqKuwaitRegion.css";

const placeholderImages = {
  iraq: "https://www.worldatlas.com/r/w960-q80/img/flag/iq-flag.jpg",
  kuwait: "https://www.worldatlas.com/r/w960-q80/img/flag/kw-flag.jpg",
  region: require("../assets/region.png"),
};

function Image({ id }) {
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const countries = [
    {
      name: "Iraq",
      description:
        "From Iraq's perspective, Kuwait always belonged to Iraq as a province and was separated by Britian during the British Colonial rule. Iraq claims that the borders were created by British Imperialists and were illegitamte. Since after the Iraq-Iran War, Iraq wanted to increase their oil prices to be able to cover their war costs but because Kuwait as abudant of oil with low prices Iraq can't so they accuse Kuwait of producing a lot of oil beyond the OPEC (The Organization of the Petroleum Exporting Countries) quotas, harming Iraq's economy when it is trying to recover from the war with Iran. Iraq also alleged that Kuwait as been slant drilling across the border into Iraqi oil fields, stealing $2.4 billion in oil. Iraq wanted Kuwait to repay in 1989, further increasing tensions.",
    },
    {
      name: "Kuwait",
      description:
        "When Saddam Hussein went in power, Kuwait  became more cautious. Kuwait saw Iraq as an aggressive neighbour but didn't want to have anything to do with Iraq. During the first 2 years of Iran-Iraq War, Kuwait stayed quiet until they realised that the Iranian Revolution could move into its border which forced the country to choose sides. Kuwait decided to pick sides with Iraq from 1982-1983, providing financial aid which accumulated up to $14 billion. Kuwait also provided Iraq to their ports after Basra port in Iraq got destroyed. After Iran-Iraq War, Iraq couldn't pay back Kuwait and this made Kuwait upset. Huessein and Kuwait's leader tried to reach an agreement during 1989 several times but with no success.",
    },
  ];
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const mapVariants = {
    closed: { opacity: 0, scale: 0.8 },
    open: { opacity: 1, scale: 1 },
  };

  const countryVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const openModal = (country) => {
    setSelectedCountry(country);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="iraq-kuwait-container">
      <h3 className="main-title">Iraq & Kuwait</h3>

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
              <img
                src={placeholderImages.region}
                alt="Iraq-Kuwait Region"
                className="region-map"
              />
            </motion.div>
          </AnimatePresence>

          <div className="country-buttons">
            {countries.map((country) => (
              <motion.button
                key={country.name}
                className="country-btn"
                onClick={() => openModal(country)}
                whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
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
                <h2 className="country-title">{selectedCountry.name}'s View</h2>
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsModalOpen(true)}
                  src={placeholderImages[selectedCountry.name.toLowerCase()]}
                  alt={selectedCountry.name}
                  className="country-image"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p style={{paddingTop: 20, color: 'black', marginTop: 30, cursor: 'pointer', fontSize: 30, fontWeight: 'bold', textAlign: 'center', background: 'white'}} onClick={goToNextPage}>Invasion!</p>

     

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div className="modal-content">
              <h2 className="country-title">{selectedCountry.name}</h2>
              <img
                src={placeholderImages[selectedCountry.name.toLowerCase()]}
                alt={selectedCountry.name}
                className="country-image"
              />
              <p style={{ color: "black" }}>{selectedCountry.description}</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IraqKuwait;
