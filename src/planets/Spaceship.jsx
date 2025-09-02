import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Spaceship = ({ destination, onArrival }) => {
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    if (destination) {
      setIsFlying(true);
    }
  }, [destination]);

  const flyingTransition = {
    type: "tween",
    duration: 1.5, // How long the flight takes (in seconds)
    ease: "easeInOut",
    onComplete: () => {
      setIsFlying(false);
      onArrival && onArrival(); // Call the callback function after arrival
    }
  };

  const hoverAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    }
  };

  const fireEffectVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: [0, 1, 0.5, 0], scale: [0.5, 1, 1, 1.5] },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="spaceship-container"
        animate={isFlying ? { x: destination.x, y: destination.y } : hoverAnimation}
        transition={isFlying ? flyingTransition : hoverAnimation.transition}
      >
        <img
          src="/Ship_1.png"
          alt="Spaceship"
          className="spaceship-image"
        />
        {isFlying && (
          <motion.div
            className="fire-effect"
            variants={fireEffectVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'loop'
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