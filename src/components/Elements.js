import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 500px;
  margin: 20px;
`;

const CenteredPhoto = styled(motion.div)`
  max-height: 420px;
  width: 100%;
  margin-left: 10px;
  background-color: whitesmoke;
  .photo {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      cursor: pointer;
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

const ThumbsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Thumb = styled(motion.li)`
  position: relative;
  width: 60px;
  height: 75px;
  cursor: pointer;
  margin-bottom: 10px;
  box-sizing: border-box;
  img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  .outline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #808080;
  }
`;

const Lightbox = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  will-change: opacity;
//   position: absolute;
//   top: 0;
//   left: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  .photoContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .close {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: absolute;
    top: 0;
    bottom: 0;
  }
`;

export { Container, CenteredPhoto, ThumbsContainer, Thumb, Lightbox };
