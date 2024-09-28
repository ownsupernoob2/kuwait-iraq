import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles.css';

const conflictDetails = [
  {
    title: 'What Happened',
    description: 'The Iraq-Kuwait conflict began on August 2, 1990, when Iraq, led by Saddam Hussein, invaded Kuwait.',
  },
  {
    title: 'How It Happened',
    description: 'Iraq justified the invasion by claiming that Kuwait was stealing Iraqi oil through slant drilling.',
  },
  {
    title: 'Why It Happened',
    description: 'Economic pressures, debt from the Iran-Iraq War, and disputes over oil resources led to the invasion.',
  },
];

const Invasion = ({ goToNextPage }) => {
  const [selectedDetail, setSelectedDetail] = useState(conflictDetails[0]);

  const handleSelectDetail = (detail) => {
    setSelectedDetail(detail);
  };

  return (
    <div className="conflict-overview">
      <h1 className="main-title">Iraq-Kuwait Invasion</h1>
      <div className="details-wrapper">
        <div className="left-column">
          <h2>Select a Topic</h2>
          {conflictDetails.map((detail) => (
            <motion.button
              key={detail.title}
              className="detail-button"
              onClick={() => handleSelectDetail(detail)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {detail.title}
            </motion.button>
          ))}
        </div>
        
        <div className="right-column">
          <AnimatePresence>
            <motion.div
              key={selectedDetail.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="detail-info"
            >
              <h2>{selectedDetail.title}</h2>
              <p>{selectedDetail.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button onClick={goToNextPage} className="next-button">
        Next Section
      </button>
    </div>
  );
};

export default Invasion;
