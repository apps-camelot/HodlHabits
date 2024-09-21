import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChangingText = ({ words = [] }) => {
  const [index, setIndex] = useState(0);

  const animations = [
    {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
    {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
    {
      initial: { opacity: 0, filter: "blur(10px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(10px)" },
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
    {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: -90 },
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change the word every 3 seconds
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <motion.div layout>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-[4rem] font-bold maxmd:text-[2rem] items-center text-center"
        style={{
          fontWeight: "bold",
          letterSpacing: "-0.05em",
        }}
        layout
      >
        Creating <span style={{ color: "#9ad5ca" }}>challenge</span>, this <br />
        will be
        <AnimatePresence mode="wait">
          <motion.span
            layout
            key={index}
            {...animations[index % animations.length]}
            className="ml-2 inline-block !text-[#adb9e3]"
            style={{
              color: "#adb9e3",
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
        {/* <span style={{ textDecoration: 'underline #acdde7' }}>🚀</span>  */}
        🚀
      </motion.h1>
    </motion.div>
  );
};

export default ChangingText;
