import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import "../styles.css";

function ProductImage({ id, onExpand }) {
  return (
    <motion.img
      src={`https://picsum.photos/id/${id}/200/200`}
      alt=""
      onClick={() => onExpand(id)}
      className="related-product-image"
      layoutId={`product-${id}`}
    />
  );
}

export default function BabySaddam() {
  const [productIds, setProductIds] = useState([238, 239, 240]);
  const [primaryProduct, setPrimaryProduct] = useState(237);
  const [hasClicked, setHasClicked] = useState(false);
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
  
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [45, -45]);
  const rotateY = useTransform(x, [0, 400], [-45, 45]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }
  function setAsPrimary(id) {
    const currentProductId = primaryProduct;
    const newProductIds = [
      ...productIds.filter((x) => x !== id),
      currentProductId,
    ];

    setPrimaryProduct(id);
    setProductIds(newProductIds);
  }

  const handleClick = () => {
    if (hasClicked) {
      setHasClicked(false);
    } else {
  setHasClicked(true)
    }
  };



  return (
    <div className="sad-container">
      { 
 !is2ndPage ?   <section>
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
</section> : 
      <header className="header">
        <motion.div
          style={{
            width: 300,
            display: "flex",
            placeItems: "center",
            placeContent: "center",
            borderRadius: 30,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
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
            whileTap={{ scale: 0.8, rotate: 3 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 80px 30px #ddd",
              borderRadius: 50,
            }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
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
          transition={{ duration: 1 }}
          className="header-content"
          >
          <h1 className="title">Saddam Hussein</h1>
          <h2 className="subtitle">Former President of Iraq</h2>
          <p className="dates">
            Born: April 28, 1937 - Died: December 30, 2006
          </p>
        </motion.div>
      </header>

}
{ is2ndPage &&
      <main className="bio-section">
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          >
          Biography
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
            April 9, 2003. He was a prominent member of the Arab Socialist
            Ba'ath Party and the Baghdad-based Ba'ath Party, which espoused a
            mix of Arab nationalism and socialism.
          </p>
          <p>
            Hussein’s leadership was marked by the nationalization of Iraq's oil
            industry, and he is also known for leading Iraq through the
            Iran-Iraq War and the Gulf War. He ruled Iraq for nearly 24 years
            before being overthrown by a coalition led by the United States in
            2003.
          </p>
        </motion.div>

        <div className="g-container">
          <motion.div className="primary-container">
            <AnimatePresence>
              <motion.img
                key={primaryProduct}
                className="primary-product-image"
                src={`https://picsum.photos/id/${primaryProduct}/1280/620`}
                alt=""
                layoutId={`product-${primaryProduct}`}
                layout="position" 
              />
              <p style={{zIndex: 4}}>hi</p>
            </AnimatePresence>
          </motion.div>
          <aside className="product-gallery">
            <AnimatePresence>
              {productIds.map((id) => (
                <ProductImage id={id} key={id} onExpand={setAsPrimary} />
              ))}
            </AnimatePresence>
          </aside>
        </div>
    </main>
    }
    </div>
  );
}
