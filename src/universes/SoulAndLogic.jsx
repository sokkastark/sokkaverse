import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

// --- SKY ORB COMPONENT (Sun & Moon) ---
const SkyOrb = ({ type, timeProgress }) => {
    
    // --- CALCULATIONS ---
    // Y position: Arc motion based on the sine wave (0 = bottom, 1 = bottom)
    const yArcProgress = Math.sin(timeProgress * Math.PI); 
    const yFinal = type === 'sun' ? yArcProgress * -80 : yArcProgress * -40; // Max height in vh
    
    // X position: Horizontal sweep (0 = left, 1 = right)
    const xFinal = timeProgress * 100; // 0% to 100% of the screen sweep
    
    // Visibility: Only show when it's supposed to be in the sky
    const isVisible = (type === 'sun' && timeProgress < 0.8 && timeProgress > 0.3) || 
                      (type === 'moon' && (timeProgress >= 0.8 || timeProgress <= 0.3));

    return (
        <motion.div 
            className={`sky-orb ${type}`}
            // Anchor the orb at the bottom-left corner from where the animation starts
            style={{ 
                position: 'absolute',
                left: type === 'sun' ? '-10vw' : '40vw', // Start points off-screen or slightly offset
                top: '100vh', 
                // Use translate to center the orb relative to its anchor point (crucial fix)
                transform: 'translate(-50%, -50%)',
                opacity: isVisible ? 1 : 0
            }}
            
            // --- ANIMATION ---
            animate={{
                // Animate the X/Y translation (using calculated vh/vw values)
                x: type === 'sun' ? `${xFinal}vw` : `calc(${xFinal}vw - 60vw)`,
                y: `${yFinal}vh`, 
                opacity: isVisible ? 1 : 0
            }}
            
            transition={{ duration: 120, ease: 'linear' }}
        >
            {/* The orb itself is styled via CSS, not emojis */}
        </motion.div>
    );
};
    

// --- GROUND / PLANTS LAYER ---
const GroundLayer = () => {
    return (
        <div className="ground-layer">
            <motion.div className="pixel-grass"></motion.div>
            <motion.div className="pixel-tree"></motion.div>
            <motion.div className="pixel-flower"></motion.div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const SoulAndLogic = () => {
    const navigate = useNavigate();
    const [timeProgress, setTimeProgress] = useState(0.2); 
    const [theme, setTheme] = useState('night');
    const controls = useAnimation(); // Framer Motion controls for background color

    // Logic for Time Progression and Animation
    useEffect(() => {
        let startTime;
        let animationId;
        const duration = 120000; // 2 minutes (120 seconds) for a full day/night cycle
        
        const animateTime = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            
            const progress = (elapsed % duration) / duration;
            setTimeProgress(progress);

            // --- Background/Theme logic ---
            if (progress > 0.3 && progress < 0.7) {
                setTheme('day');
                // Animate background color transition for a smooth day look
                controls.start({ background: 'linear-gradient(to top, #87CEEB 0%, #AEC6CF 100%)' });
            } else {
                setTheme('night');
                // Animate background color transition for a smooth night look
                controls.start({ background: 'linear-gradient(to top, #141E30 0%, #243B55 100%)' });
            }

            animationId = requestAnimationFrame(animateTime);
        };

        animationId = requestAnimationFrame(animateTime);
        
        // Proper cleanup for the animation frame loop
        return () => cancelAnimationFrame(animationId);
    }, [controls]);


    return (
        <motion.div
            className={`garden-container ${theme}`}
            animate={controls} // Apply background color animation control
            transition={{ duration: 2, ease: "easeInOut" }} // Smooth transition for background
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
        >
            {/* 1. Sky Orbs */}
            <SkyOrb type="sun" timeProgress={timeProgress} />
            <SkyOrb type="moon" timeProgress={timeProgress} />

            {/* 2. Content Area */}
            <div className="garden-content">
                <h1>The Digital Garden 🌱</h1>
                <p>Welcome to Soul & Logic. Explore interconnected thoughts.</p>
            </div>

            {/* 3. Ground Layer */}
            <GroundLayer />

            {/* 4. Back Button */}
            <button className="garden-back-btn" onClick={() => navigate('/')}>
                ← Back to Galaxy
            </button>
        </motion.div>
    );
};

export default SoulAndLogic;