import React from 'react';
import { motion } from 'framer-motion';

// Sample data structure for the photography frames
const photoFrames = [
  { id: 'prod', title: 'Product Photography', type: 'photo', image: 'Placeholder1.jpg' },
  { id: 'preschool', title: 'Preschool Photography', type: 'photo', image: 'Placeholder2.jpg' },
  { id: 'event', title: 'Event Photography', type: 'photo', image: 'Placeholder3.jpg' },
  { id: '360', title: '360-Degree Photography', type: 'photo', image: 'Placeholder4.jpg' },
  { id: 'post', title: 'Post-Processing Skills', type: 'photo', image: 'Placeholder5.jpg' },
];

const FilmStripGallery = ({ onFrameClick }) => {
  return (
    // The main container for the scrollable reel
    <motion.div className="film-reel-container">
      {/* Container styled with the perforation pattern (CSS will do the magic) */}
      <motion.div className="film-strip-inner">
        {photoFrames.map((frame, index) => (
          <motion.div
            key={frame.id}
            className="film-frame"
            onClick={() => onFrameClick(frame)}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 195, 0, 0.8)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="frame-image-box">
              {/* Placeholder for actual image/video thumbnail */}
              <span className="frame-icon">📸</span>
            </div>
            <div className="frame-label">{frame.title}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FilmStripGallery;