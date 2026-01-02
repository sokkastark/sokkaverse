import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FilmStripGallery from './FilmStripGallery'; // <--- NEW IMPORT

const CinematicMind = () => {
  const navigate = useNavigate();
  // State to track the active section: 'frame', 'sequence', or 'vision'
  const [activeSection, setActiveSection] = useState('frame'); 
  const [modalContent, setModalContent] = useState(null); // State for opening details

  const handleFrameClick = (frame) => {
      // In the future, this will open a modal or dedicated details view
      alert(`Opening details for: ${frame.title}`); 
      setModalContent(frame); 
  };

  // --- Content Placeholders ---
  const renderMainContent = () => {
    switch (activeSection) {
      case 'frame':
        return (
          <div className="content-area frame-area">
            <h1 className="section-title">I. The Frame (Photography)</h1>
            <p className="section-subtitle">// Mastering light, post-processing, and visual precision.</p>
            
            {/* NEW: Use the FilmStripGallery component here */}
            <FilmStripGallery onFrameClick={handleFrameClick} /> 

            {/* Optional: Add a modal component here later */}
            {modalContent && <div className="modal-overlay">...</div>}

          </div>
        );
      case 'sequence':
        return (
          <div className="content-area sequence-area">
            <h1>II. The Sequence (Videography)</h1>
            <p>// Video Embeds and Thumbnails go here.</p>
            <p className="note">// Training, Marketing, Event, and Podcast Production.</p>
          </div>
        );
      case 'vision':
        return (
          <div className="content-area vision-area">
            <h1>III. The Vision (Director's Mind)</h1>
            <p>// Future Film Ideas and Consultation Scripts go here.</p>
            <p className="note">// Feature Film Ideas, Music Videos, and Consultation Services.</p>
          </div>
        );
      default:
        return null;
    }
  };

  // --- Main Render ---
  return (
    <motion.div
      className="cinematic-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 1. Main Viewport (The Large Screen) */}
      <div className="cinematic-viewport">
        {renderMainContent()}
      </div>

      {/* 2. Director's Notes Overlay (For subtle text descriptions) */}
      <motion.div 
        className="director-notes"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="note-label">// DIRECTOR'S NOTES</p>
        <p className="note-text">
          {activeSection === 'frame' && "A single photograph is a world entire. Master the light, master the frame."}
          {activeSection === 'sequence' && "Storytelling is rhythm. Every cut, every scene, is a beat in the heart of the narrative."}
          {activeSection === 'vision' && "The greatest films are always the ones yet to be made. Explore the conceptual frontier."}
        </p>
      </motion.div>

      {/* 3. Film Strip Menu (Horizontal Navigation) */}
      <div className="film-strip-menu">
        <button 
          className={`film-strip-item ${activeSection === 'frame' ? 'active' : ''}`}
          onClick={() => setActiveSection('frame')}
        >
          I. The Frame (Photography)
        </button>
        <button 
          className={`film-strip-item ${activeSection === 'sequence' ? 'active' : ''}`}
          onClick={() => setActiveSection('sequence')}
        >
          II. The Sequence (Videography)
        </button>
        <button 
          className={`film-strip-item ${activeSection === 'vision' ? 'active' : ''}`}
          onClick={() => setActiveSection('vision')}
        >
          III. The Vision (Concepts)
        </button>
      </div>

      {/* 4. Back Button */}
      <button className="cinematic-back-btn" onClick={() => navigate('/')}>
        ← Back to Galaxy
      </button>

    </motion.div>
  );
};

export default CinematicMind;