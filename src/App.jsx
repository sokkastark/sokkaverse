import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// Universal Components
import GalaxyHome from './GalaxyHome';

// Universe Components
import DesignStudio from './universes/DesignStudio';
import CinematicMind from './universes/CinematicMind';
import SoulAndLogic from './universes/SoulAndLogic';
import LearnerTerminal from './universes/LearnerTerminal';
import SokkaLab from './universes/SokkaLab';

import './App.css';

// TypingLine and TerminalLoader components remain unchanged here
const TypingLine = ({ text, speed = 45, onComplete, withCursor = false }) => {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i));
            i++;
            if (i > text.length) {
                clearInterval(interval);
                setDone(true);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onComplete]);

    return (
        <div className="terminal-line">
            {displayed}
            {withCursor && done && <span className="blink-cursor">|</span>}
        </div>
    );
};

const TerminalLoader = ({ duration = 6, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [bar, setBar] = useState('[----------]');

    useEffect(() => {
        let start = Date.now();
        const interval = setInterval(() => {
            const elapsed = (Date.now() - start) / 1000;
            const next = Math.min(Math.floor((elapsed / duration) * 100), 100);
            const completedBars = Math.floor(next / 10);
            const loaderBar = `[${'#'.repeat(completedBars)}${'-'.repeat(10 - completedBars)}]`;

            setProgress(next);
            setBar(loaderBar);

            if (next >= 100) {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, 100);

        return () => clearInterval(interval);
    }, [duration, onComplete]);

    return (
        <div className="terminal-line">
            {`Loading multiverse gateways ${bar} ${progress}%`}
        </div>
    );
};


// This is the core App component that manages state and routing
function AppContent() {
    const [step, setStep] = useState(0);
    const [command, setCommand] = useState('');
    const [terminalOutput, setTerminalOutput] = useState([]);
    const [spaceshipDestination, setSpaceshipDestination] = useState(null);
    const [destinationId, setDestinationId] = useState(null); // New state to hold the planet ID
    
    // Hook to allow programmatic navigation
    const navigate = useNavigate();

    // Terminal startup logic remains here
    useEffect(() => {
        let timer;
        if (step === 0) {
            timer = setTimeout(() => setStep(1), "Initializing Sokkaverse OS...".length * 45 + 500);
        } else if (step === 1) {
            timer = setTimeout(() => setStep(2), 6000);
        } else if (step === 2) {
            timer = setTimeout(() => setStep(3), "System Ready. Input your query / Ask anything about Sokka / Why are you here?:".length * 45 + 500);
        } else if (step === 3) {
            setStep(4);
        }
        return () => clearTimeout(timer);
    }, [step]);

    const handleCommand = (event) => {
        if (event.key === 'Enter') {
            const inputCommand = command.trim().toLowerCase();

            setTerminalOutput(prevOutput => [
                ...prevOutput,
                `>> ${command}`,
                `Command '${inputCommand}' received. Processing...`
            ]);
            setCommand('');
        }
    };

    // TRIGGERS SHIP FLIGHT: Captures destination coordinates and ID
    const navigateToPlanet = (planetId, planetPosition) => {
        setSpaceshipDestination(planetPosition);
        setDestinationId(planetId); // Store the planet ID
        console.log('Planet clicked:', planetId, 'at position:', planetPosition);
    };

    // TRIGGERS PAGE JUMP: Called by Spaceship component when animation is complete
    const onArrival = () => {
        // Set a small delay to ensure the animation is fully rendered before jumping
        setTimeout(() => {
            if (destinationId) {
                navigate(`/${destinationId}`); // Navigate to the path based on planet ID (e.g., /design)
            }
            setSpaceshipDestination(null);
            setDestinationId(null);
        }, 100); 
    };

    return (
        <>
            <Routes>
                {/* Home/Galaxy Route: Displays the terminal and all galaxy elements */}
                <Route path="/" element={
                    <>
                        {/* The GalaxyHome component holds the Planets, Backgrounds, and Spaceship */}
                        <GalaxyHome 
                            navigateToPlanet={navigateToPlanet} 
                            spaceshipDestination={spaceshipDestination} 
                            onArrival={onArrival}
                        />

                        {/* Terminal Window (placed separately to ensure it stays on top) */}
                        <motion.div
                            className="terminal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            {/* Terminal output logic remains here... */}
                            {step >= 0 && (<TypingLine text="Initializing Sokkaverse OS..." speed={45} />)}
                            {step >= 1 && (<TerminalLoader duration={6} />)}
                            {step >= 2 && (
                                <TypingLine
                                    text="System Ready. Input your query / Ask anything about Sokka / Why are you here?:"
                                    speed={45}
                                    withCursor={true}
                                />
                            )}
                            {step >= 3 && terminalOutput.map((line, index) => (
                                <TypingLine key={index} text={line} speed={10} />
                            ))}
                            {step >= 3 && (
                                <motion.div
                                    className="command-input-container"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <span className="prompt">{'>>'}</span>
                                    <input
                                        type="text"
                                        className="command-input"
                                        value={command}
                                        onChange={(e) => setCommand(e.target.value)}
                                        onKeyDown={handleCommand}
                                        autoFocus
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    </>
                } />

                {/* Specific Universe Routes: These pages replace the homepage entirely */}
                <Route path="/design" element={<DesignStudio />} />
                <Route path="/film" element={<CinematicMind />} />
                <Route path="/soul" element={<SoulAndLogic />} />
                <Route path="/code" element={<LearnerTerminal />} />
                <Route path="/lab" element={<SokkaLab />} />

            </Routes>
        </>
    );
}

// Main App Wrapper
function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;