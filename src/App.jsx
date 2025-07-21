import AsciiBackground from './AsciiBackground'; // New Import
import ParticleEffect from './ParticleEffect'; // New Import
import './App.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Typing line with optional blinking cursor
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
    <div className="terminal-line"> {/* Added a class for consistent line styling */}
      {displayed}
      {withCursor && done && <span className="blink-cursor">|</span>}
    </div>
  );
};

// Loading bar animation [####------] style
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
    <div className="terminal-line"> {/* Added a class for consistent line styling */}
      {`Loading multiverse gateways ${bar} ${progress}%`}
    </div>
  );
};

function App() {
  const [step, setStep] = useState(0); // control animation sequence
  const [command, setCommand] = useState(''); // New: state for the command input

  // Define the sequence of actions/delays for better control
  useEffect(() => {
    // This useEffect ensures the sequence triggers correctly once the component mounts
    // and helps avoid re-triggering logic on subsequent renders.
    if (step === 0) {
      // First line
      const timer1 = setTimeout(() => {
        setStep(1);
      }, "Initializing Sokkaverse OS...".length * 45 + 500); // text length * speed + small buffer
      return () => clearTimeout(timer1);
    } else if (step === 1) {
      // Loader
      const timer2 = setTimeout(() => {
        setStep(2);
      }, 6000); // Loader duration
      return () => clearTimeout(timer2);
    } else if (step === 2) {
      // Final line
      const timer3 = setTimeout(() => {
        setStep(3);
      }, "System Ready. Enter a command or select an option:".length * 45 + 500);
      return () => clearTimeout(timer3);
    }
  }, [step]); // Only re-run when 'step' changes

  const navigate = (page) => alert(`Portal to ${page} universe is not ready yet.`);

return (
  <> {/* Use a Fragment to render multiple top-level elements */}
    <AsciiBackground /> {/* New: Render the background component */}
    <ParticleEffect /> {/* New: Render the particle component */}

    <motion.div
      className="terminal"
      initial={{ opacity: 0, scale: 0.9 }} // Initial state for fade-in
      animate={{ opacity: 1, scale: 1 }}    // Animate to full opacity and scale
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition for the container itself
    >
      {/* Step 0: Boot line */}
      {step >= 0 && (
        <TypingLine text="Initializing Sokkaverse OS..." speed={45} />
      )}

      {/* Step 1: Loader */}
      {step >= 1 && (
        <TerminalLoader duration={6} />
      )}

      {/* Step 2: Final line with cursor */}
      {step >= 2 && (
        <>
          <TypingLine
            text="System Ready. Enter a command or select an option:"
            speed={45}
            withCursor={true}
          />

          {step >= 3 && ( // This ensures input appears after "System Ready" message
            <motion.div
              className="command-input-container"
               initial={{ opacity: 0, y: 10 }} // Starts invisible and slightly below
               animate={{ opacity: 1, y: 0 }}   // Animates to full visibility and original position
               transition={{ duration: 0.5, delay: 0.2 }} // Smooth transition after a small delay
              >
              <span className="prompt">sokkaverse$&gt;</span>
              <input
                type="text"
                className="command-input"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                autoFocus // Automatically focus the input when it appears
              />
            </motion.div>
          )}
        </>
      )}

      {/* Step 3: Button menu */}
      {step >= 3 && (
        <motion.div
          className="menu"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5 // Delay menu items slightly after main boot sequence
              },
            },
          }}
        >
          {[
            { label: 'Design Studio 🎨', key: 'design' },
            { label: 'Cinematic Mind 🎬', key: 'film' },
            { label: 'Soul & Logic 🌱', key: 'soul' },
            { label: 'Learner Terminal 💻', key: 'code' },
            { label: 'Sokka Lab 🧠', key: 'lab' },
          ].map((btn, index) => (
            <motion.button
              key={btn.key}
              onClick={() => navigate(btn.key)}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              // Removed individual transition delay here as staggerChildren handles it
            >
              {btn.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
    </>
  );
}

export default App;
