import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import AsciiBackground from './components/AsciiBackground';
import ParticleEffect from './components/ParticleEffect';
import Spaceship from './planets/Spaceship';
import Planets from './planets/Planets';

import './App.css';

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

function App() {
  const [step, setStep] = useState(0);
  const [command, setCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [spaceshipDestination, setSpaceshipDestination] = useState(null);

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

  const navigateToPlanet = (planetId, planetPosition) => {
    setSpaceshipDestination(planetPosition);
    console.log('Planet clicked:', planetId, 'at position:', planetPosition);
  };

  const onArrival = () => {
    alert("Spaceship arrived!");
    setSpaceshipDestination(null);
  };

  return (
    <>
      <AsciiBackground />
      <ParticleEffect />
      <Planets onPlanetClick={navigateToPlanet} />
      <Spaceship
        destination={spaceshipDestination}
        onArrival={onArrival}
      />

      <motion.div
        className="terminal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {step >= 0 && (
          <TypingLine text="Initializing Sokkaverse OS..." speed={45} />
        )}

        {step >= 1 && (
          <TerminalLoader duration={6} />
        )}

        {step >= 2 && (
          <TypingLine
            text="System Ready. Input your query / Ask anything about Sokka / Why are you here?:"
            speed={45}
            withCursor={true}
          />
        )}
        
        {step >= 3 && (
          terminalOutput.map((line, index) => (
            <TypingLine key={index} text={line} speed={10} />
          ))
        )}

        {step >= 3 && (
          <motion.div
            className="command-input-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
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
  );
}

export default App;