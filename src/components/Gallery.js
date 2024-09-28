import React from "react";
import {
  Container,
  CenteredPhoto,
  ThumbsContainer,
  Thumb,
  Lightbox
} from "./Elements";
import { images } from "./data";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: {
    scale: 1.05,
    boxShadow: "0px 0px 3px 1px rgba(74,20,140,1)",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  exit: { scale: 1, boxShadow: "0px", border: "0px" }
};

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "auto";
  }, [lightboxOpen]);

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <ThumbsContainer>
          {images.map((image, i) => (
            <Thumb
              key={`thumb-${i}`}
              variants={variants}
              onMouseOver={() => setSelectedPhoto(i)}
              whileTap={{ scale: 1 }}
              onClick={() => {
                setSelectedPhoto(i);
                setLightboxOpen(true);
              }}
              animate={selectedPhoto === i ? "enter" : "exit"}
            >
              {selectedPhoto !== i && <div className="outline" />}
              <img src={image} alt={`Thumbnail ${i}`} />
            </Thumb>
          ))}
        </ThumbsContainer>
        <CenteredPhoto>
          <AnimatePresence>
            <motion.div
              key={`image-${selectedPhoto}`}
              className="photo"
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100%" }}
              transition={{ height: { duration: 0 } }}
            >
              <motion.img
                src={images[selectedPhoto]}
                onClick={() => setLightboxOpen(true)}
                alt={`Selected ${selectedPhoto}`}
              />
            </motion.div>
          </AnimatePresence>
        </CenteredPhoto>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="close" onClick={() => setLightboxOpen(false)} />
            <motion.div className="photoContainer">
              <motion.img
                src={images[selectedPhoto]}
                transition={{ duration: 0.2 }}
                alt={`Lightbox ${selectedPhoto}`}
              />
            </motion.div>
          </Lightbox>
        )}
      </AnimatePresence>
    </Container>
  );
}
