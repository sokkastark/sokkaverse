import React from 'react';
import { useNavigate } from 'react-router-dom';

const LearnerTerminal = () => {
  const navigate = useNavigate();

  return (
    <div className="universe-page">
      <h1>Learner Terminal 💻</h1>
      <p>The code editor where you log your learning and projects.</p>
      <button onClick={() => navigate('/')}>
        ← Back to Galaxy
      </button>
    </div>
  );
};

export default LearnerTerminal;