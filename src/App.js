import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Welcome from "./screens/Welcome";
import BabySaddam from "./screens/BabySaddam";
import IraqKuwait from "./screens/IraqKuwait";
import Invasion from "./screens/Invasion";
import Aftermath from "./screens/Aftermath";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1); // Start from page index 0

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < pages.length - 1 ? prevPage + 1 : prevPage
    );
  };

  // Scroll to the top whenever the current page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const pages = [
    <Welcome key="Welcome" goToNextPage={goToNextPage} />,
    <BabySaddam key="BabySaddam" goToNextPage={goToNextPage} />,
    <IraqKuwait key="IraqKuwait" goToNextPage={goToNextPage} />,
    <Invasion key="Invasion" goToNextPage={goToNextPage} />,
    <Aftermath key="Aftermath" goToNextPage={goToNextPage} />,
  ];

  return (
    <div>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentPage} // Ensure unique key for each page to trigger transition
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.5 }} // Adjust the duration for a smoother/faster transition
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
