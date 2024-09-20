import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import "../App.css";


export default function Iraq() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
    <motion.img
    src={require("../assets/saddam.png")}
    alt="Portrait of Saddam Huessein"
    style={{ justifyContent: 'space-between', width: 200 }}
  />
  <div styles={{marginLeft: "200px",}}>
    <motion.div
      layout
      transition={transition}
      onClick={() => setIsOpen(!isOpen)}
      style={{
        backgroundColor: "#fff",
        padding: 40,

        overflow: "hidden",
        maxWidth: 500
      }}
    >
      <motion.div layout="position" transition={transition}>
        {isOpen ? long : summary}
      </motion.div>
    </motion.div>
    </div>
    </div>
  );
}

const transition = {
  duration: 1.5
};

const summary = `
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
`;

const long = `
${summary} The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
`;
