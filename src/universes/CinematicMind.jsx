import React from 'react';
import { useNavigate } from 'react-router-dom';

const CinematicMind = () => {
  const navigate = useNavigate();

  return (
    <div className="universe-page">
      <h1>Cinematic Mind 🎬</h1>
      <p>Your universe of photography and videography awaits.</p>
      <button onClick={() => navigate('/')}>
        ← Back to Galaxy
      </button>
    </div>
  );
};

export default CinematicMind;