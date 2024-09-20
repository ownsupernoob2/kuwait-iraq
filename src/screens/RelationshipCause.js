import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles.css";
import { useFollowPointer } from "../components/use-follow-pointer";

export default function RelationshipCause() {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showYesBox, setShowYesBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const ref1 = useRef(null);
  const { x, y } = useFollowPointer(ref1);

  const texts = [
    "Welcome",
    "This site talks about Iraq's invasion of Kuwait",
    "Are you ready?",
  ];

  useEffect(() => {
    if (currentText < texts.length - 1) {
      const visibilityTimer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      const textSwitchTimer = setTimeout(() => {
        setCurrentText((prev) => prev + 1);
        setIsVisible(true);
      }, 5000);

      return () => {
        clearTimeout(visibilityTimer);
        clearTimeout(textSwitchTimer);
      };
    } else {
      const yesBoxTimer = setTimeout(() => {
        setShowYesBox(true);
      }, 2000);

      return () => clearTimeout(yesBoxTimer);
    }
  }, [currentText]);

  const handleYesClick = () => {
    setIsLoading(true); // Start loading animation
    setTimeout(() => {
      // Simulate some process
      setIsLoading(false); 
      alert("Process Complete!"); // This is just for demonstration; you can handle navigation or other logic here
    }, 3000); // Loading for 3 seconds
  };

  return (
    <section>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={currentText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: currentText < texts.length - 1 ? 0 : 1 }}
            transition={{ duration: 1 }}
            style={{ fontSize: "24px", textAlign: "center", margin: "20px 0" }}
          >
            {texts[currentText]}
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && ( // Show "Yes" button when not loading
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          ref={ref1}
          className="box"
          style={{
            x,
            y,
            visibility:
              currentText === texts.length - 1 && showYesBox ? "" : "hidden",
          }}
        >
          <div
            style={{ cursor: "pointer" }}
          >
            <p
              style={{
                color: "#444444",
                textAlign: "center",
                paddingTop: 4.5,
                alignSelf: "center",
                fontSize: 14,
              }}
            >
              Yes
            </p>
          </div>
        </motion.div>
      )}

     
    </section>
  );
}
