import React from 'react';
import { motion } from 'framer-motion';

const galleryItems = [
  { id: 1, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SaddamCairo.jpg/220px-SaddamCairo.jpg", alt: "Placeholder 1", description: "Saddam Hussein with the Ba'ath Party in Cairo, Egypt 1959-1963" },
  { id: 2, src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Iraq_1963_-_Saddam_and_other_Ba%27athists.jpg", alt: "Placeholder 2", description: "Rise to power in the Ba'ath Party" },
  { id: 3, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/%D8%B5%D8%AF%D8%A7%D9%85.png/220px-%D8%B5%D8%AF%D8%A7%D9%85.png", alt: "Placeholder 4", description: "Young Saddam Hussein" },
  { id: 4, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Kuwaiti_Prime_Minister_Alaa_Hussein_Ali_1990_with_Iraqi_President_Saddam_Hussein.jpg/220px-Kuwaiti_Prime_Minister_Alaa_Hussein_Ali_1990_with_Iraqi_President_Saddam_Hussein.jpg", alt: "Placeholder 3", description: "Saddam Hussein and Colonel Ali (Prime Minister of Kuwait) talk about uniting in Baghdad 1990" },
];

const ImageGallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="gallery-container"
    >
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            className="gallery-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={item.src} alt={item.alt} className="gallery-image" />
            <p className="gallery-description">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ImageGallery;