import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseButton } from "../components/CloseButton";
import { add, remove } from "../components/array-utils";
import "../styles.css";

export default function BabySaddam() {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isJawDown, setIsJawDown] = useState(false);
  const [hasEaten, setHasEaten] = useState(false);
  const [notifications, setNotifications] = useState([0]);
  const [expandedSpheres, setExpandedSpheres] = useState([false, false, false]);

  const handleExpand = (index) => {
    setExpandedSpheres((prev) =>
      prev.map((isExpanded, i) => (i === index ? !isExpanded : isExpanded))
    );
  };

  const texts = [
    "From now on, I will be down here",
    "This kid is Saddam Huessein",
    "For more info, click on the spheres and then when you feel satisfied click next",
  ];

  const constraintsRef = useRef(null);
  const draggableRef = useRef(null);
  const imgRef = useRef(null);
  const jawRef = useRef(null);

  const checkOverlap = () => {
    if (draggableRef.current && imgRef.current && jawRef.current) {
      const shapeRect = draggableRef.current.getBoundingClientRect();
      const jawRect = jawRef.current.getBoundingClientRect();

      const eaten =
        shapeRect.bottom >= jawRect.top &&
        shapeRect.top < jawRect.top &&
        shapeRect.right > jawRect.left &&
        shapeRect.left < jawRect.right;

      if (eaten) {
        console.log("The item touched the top of the jaw (eaten)!");
        setHasEaten(true);
      }

      const imgRect = imgRef.current.getBoundingClientRect();
      const overlap =
        shapeRect.left < imgRect.right &&
        shapeRect.right > imgRect.left &&
        shapeRect.top < imgRect.bottom &&
        shapeRect.bottom > imgRect.top;

      if (overlap) {
        setIsJawDown(true);
      } else {
        setIsJawDown(false);
      }
    }
  };

  return (
    <section>
      <AnimatePresence>
        <motion.div className="container" style={{ position: "relative" }}>
          {currentText >= 1 && !hasEaten && (
            <motion.div
              className="container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              ref={constraintsRef}
              style={{ position: "relative" }}
            >
              <motion.img
                className="item"
                drag
                src="https://www.pngall.com/wp-content/uploads/2016/05/Strawberry-High-Quality-PNG.png"
                dragConstraints={constraintsRef}
                ref={draggableRef}
                onDrag={checkOverlap}
                style={{ position: "relative", zIndex: 2 }}
              />
              <motion.img
                src={require("../assets/baby.png")}
                alt="baby"
                ref={imgRef}
                style={{ position: "relative", zIndex: 1 }}
              />

              <motion.img
                src={require("../assets/jaw.png")}
                alt="jaw"
                ref={jawRef}
                style={{
                  position: "absolute",
                  top: 198,
                  left: 144,
                  zIndex: 3,
                }}
                animate={{ y: isJawDown ? 10 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          )}

          {hasEaten && (
            <motion.img
              src={require("../assets/saddam.png")}
              alt="saddam"
              initial={{ x: imgRef.current?.offsetLeft, y: imgRef.current?.offsetTop, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ position: "absolute", width: 200,  top: 0, left: 0, zIndex: 4 }}
            />
          )}
        </motion.div>

        <div className="container">
          <ul>
            <AnimatePresence initial={false} mode="popLayout">
              {notifications.map((id) => (
                <motion.li
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <CloseButton
                    close={() => setNotifications(remove(notifications, id))}
                  />
                  <p>{texts[id]}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <button
            className="add"
            onClick={() => {
              setCurrentText((prev) => (prev + 1) % texts.length);
              setNotifications(add(notifications));
            }}
          >
            +
          </button>
        </div>

        {currentText >= 2 && (
          <motion.div
            className="info-spheres"
            style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {texts.map((text, index) => (
              <motion.div
                key={index}
                className="info-sphere"
                onClick={() => handleExpand(index)}
                style={{
                  width: expandedSpheres[index] ? "200px" : "50px",
                  height: expandedSpheres[index] ? "150px" : "50px",
                  borderRadius: expandedSpheres[index] ? "10px" : "50%",
                  backgroundColor: expandedSpheres[index] ? "#ffcccb" : "#00bfff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
                animate={{
                  width: expandedSpheres[index] ? 200 : 50,
                  height: expandedSpheres[index] ? 150 : 50,
                  borderRadius: expandedSpheres[index] ? "10px" : "50%",
                }}
                transition={{ duration: 0.5 }}
              >
                {expandedSpheres[index] ? (
                  <motion.p
                    style={{ padding: "10px", color: "#000", textAlign: "center" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is more info about {index + 1}.
                  </motion.p>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ color: "#fff" }}
                  >
                    i
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
