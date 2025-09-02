import React from 'react';
import { motion } from 'framer-motion';

const planetData = [
  // Manually setting pixel coordinates for each planet
  { id: 'design', label: 'Design Studio', color: '#8A2BE2', initialX: 150, initialY: 250, image: '03.png' },
  { id: 'film', label: 'Cinematic Mind', color: '#32CD32', initialX: 1250, initialY: 350, image: '05.png' },
  { id: 'soul', label: 'Soul & Logic', color: '#66b2ff', initialX: 250, initialY: 600, image: '06.png' },
  { id: 'code', label: 'Learner Terminal', color: '#A0522D', initialX: 750, initialY: 650, image: '02.png' },
  { id: 'lab', label: 'Sokka Lab', color: '#00BFFF', initialX: 550, initialY: 100, image: '04.png' },
];

const Planets = ({ onPlanetClick }) => {
  return (
    <div className="planets-container">
      {planetData.map((planet, index) => (
        <motion.div
          key={planet.id}
          className="planet"
          initial={{ x: planet.initialX, y: planet.initialY, opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [planet.initialY, planet.initialY + (Math.random() * 30 - 15), planet.initialY],
            transition: {
              duration: Math.random() * 5 + 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: index * 0.5 + 3
            }
          }}
          whileHover={{ scale: 1.1, boxShadow: `0 0 25px ${planet.color}` }}
          onClick={() => onPlanetClick(planet.id, { x: planet.initialX, y: planet.initialY })}
        >
          <img src={planet.image} alt={planet.label} className="planet-image" />
          <span className="planet-label">{planet.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default Planets;