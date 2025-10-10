import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shipImage from "./Spaceship.png";

const Spaceship = ({ destination, onArrival }) => {
  const [isFlying, setIsFlying] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 40,
    y: window.innerHeight - 100,
  });
  const [rotation, setRotation] = useState(0);

  // When a new destination is set
  useEffect(() => {
    if (destination) {
      // Calculate angle between current position and target
      const dx = destination.x - position.x;
      const dy = destination.y - position.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI); // convert to degrees

      setRotation(angle); // turn toward planet
      setIsFlying(true);
    }
  }, [destination]);

  const flyingTransition = {
    type: "tween",
    duration: 5.5, // slower, smoother flight
    ease: "easeInOut",
    onComplete: () => {
      setIsFlying(false);
      setPosition(destination); // update current position
      onArrival && onArrival();
    },
  };

  const hoverAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  const fireEffectVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: [0, 1, 0.5, 0], scale: [0.5, 1, 1, 1.5] },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="spaceship-container"
        initial={position}
        animate={
          isFlying
            ? { x: destination.x, y: destination.y, rotate: rotation }
            : { ...hoverAnimation, rotate: rotation }
        }
        transition={isFlying ? flyingTransition : hoverAnimation.transition}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <img src={shipImage} alt="Spaceship" className="spaceship-image" />

        {isFlying && (
          <motion.div
            className="fire-effect2"
            variants={fireEffectVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
            }}
            
          >
            🔥
          </motion.div>
        )}
        {isFlying && (
          <motion.div
            className="fire-effect1"
            variants={fireEffectVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
            }}
            
          >
            🔥
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Spaceship;
