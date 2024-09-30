import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import "../styles.css";
import ImageGallery from "../components/ImageGallery";

export default function BabySaddam({ goToNextPage }) {
  const [hasClicked, setHasClicked] = useState(false);
  const [bye, setBye] = useState(false);
  const [isJawDown, setIsJawDown] = useState(false);
  const [hasEaten, setHasEaten] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const randIMG = [
    "https://www.transparentpng.com/thumb/pineapple/67gPxX-pineapple-png-image.png",
  ];

  const handleSaddamAnimationComplete = () => {
    setIsHeaderVisible(true);
  };

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

      console.log(eaten);
      if (eaten) {
        console.log("The item touched the top of the jaw (eaten)!");
        setIsEating(true);
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

  useEffect(() => {
    if (isEating) {
      const timer1 = setTimeout(() => {
        setBye(true);
      }, 1000);
      const timer = setTimeout(() => {
        setIsEating(false);
        setHasEaten(true);
      }, 2000);

      return () => clearTimeout(timer, timer1);
    }
  }, [isEating]);

  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [45, -45]);
  const rotateY = useTransform(x, [0, 400], [-45, 45]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const handleClick = () => {
    if (hasClicked) {
      setHasClicked(false);
    } else {
      setHasClicked(true);
    }
  };

  return (
    <div className="sad-container">
      {!hasEaten ? (
        <section>
          <AnimatePresence>
            <motion.div className="big-boy">
              {!hasEaten && (
                <motion.div
                  className="container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: bye ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  ref={constraintsRef}
                  style={{ position: "relative" }}
                >
                  <motion.img
                    className="item"
                    drag
                    src={randIMG[Math.floor(Math.random() * randIMG.length)]}
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
                    transition={{ duration: 0.5 }}
                  />
                  <motion.img
                    src={require("../assets/jaw.png")}
                    alt="jaw"
                    ref={jawRef}
                    style={{
                      position: "absolute",
                      top: 222,
                      left: 140,
                      zIndex: 3,
                    }}
                    animate={
                      isEating
                        ? {
                            scale: 1.3,
                            y: [0, 10, 0],
                            transition: {
                              y: {
                                repeat: Infinity,
                                duration: 0.5,
                                ease: "easeInOut",
                              },
                            },
                          }
                        : { scale: 1.3, y: isJawDown ? 10 : 0 }
                    }
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      ) : (
        <header className={`header ${isHeaderVisible && "fade-in"}`}>
          <motion.div
            style={{
              width: 300,
              display: "flex",
              placeItems: "center",
              placeContent: "center",
              borderRadius: 30,
              perspective: 50,
            }}
            onMouseMove={(e) => {
              hasClicked && handleMouse(e);
            }}
          >
            <motion.img
              src={require("../assets/saddam.png")}
              alt="saddam"
              className="saddam"
              onClick={handleClick}
              whileTap={
                isHeaderVisible && {
                  scale: 0.8,
                  rotate: 3,
                  transition: { delay: 0, duration: 0.2, ease: "easeInOut" },
                }
              }
              whileHover={
                isHeaderVisible && {
                  scale: 1.1,
                  boxShadow: "0px 0px 80px 30px #ddd",
                  borderRadius: 50,
                  transition: { delay: 0, duration: 0.2, ease: "easeInOut" },
                }
              }
              initial={{ opacity: 0, x: "110%" }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 3,
                  ease: "easeIn",
                  type: "spring",
                },
              }}
              onAnimationComplete={handleSaddamAnimationComplete}
              style={{
                rotateY,
                rotateX,
                width: 300,
                zIndex: 4,
                borderRadius: 20,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1, ease: "easeIn" }}
            className="header-content"
          >
            <h1 className="title">Saddam Hussein</h1>
            <h2 className="subtitle">Former President of Iraq</h2>
            <p className="dates">
              Born: April 28, 1937 - Died: December 30, 2006
            </p>
          </motion.div>
        </header>
      )}
      {hasEaten && (
        <main className="bio-section">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="bio-content"
          >
                <motion.h3
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
            >
              Introduction
            </motion.h3>
            <p>
              In August 1990, Iraq, led by President Saddam Hussein, invaded
              Kuwait to take control of its wealth and oil because Iraq was
              facing serious economic problems. This quick attack surprised the
              world and led to a U.S.-led coalition forming to fight back,
              resulting in the Gulf War, which changed the political situation
              in the Middle East and created ongoing tensions in the region.
            </p>
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
            >
              Involvement
            </motion.h3>
            <p>
              Saddam Hussein was heavily involved in the Iraq invasion of Kuwait
              and was motivated by political power, economical gain. By
              1990, Iraq was having a hard time after the Iran-Iraq War
              (1980-1988) because it had to pay more than $14 billion to Kuwait
              for financial support. Hussein wanted to find ways to recover
              economically and pay its debt. Iraq first tried asking Kuwait for
              loan forgiveness because it is unable to pay but Kuwait said no.
              Kuwait's oil wealth was abudant and so Hussein saw that as an
              oppoutunity to take control. Iraq relationship with Kuwait was
              getting worse and tension was rising.
              <p
                style={{
                  paddingTop: 20,
                  cursor: "pointer",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
                onClick={goToNextPage}
              >
                Cause and Iraq and Kuwait view on each other
              </p>
            </p>
          </motion.div>

          <ImageGallery />
        </main>
      )}
    </div>
  );
}
