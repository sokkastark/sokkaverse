import React from 'react';
import { useNavigate } from 'react-router-dom';

const SoulAndLogic = () => {
  const navigate = useNavigate();

  return (
    <div className="universe-page">
      <h1>Soul & Logic 🌱</h1>
      <p>This is your digital garden of philosophy and healing insights.</p>
      <button onClick={() => navigate('/')}>
        ← Back to Galaxy
      </button>
    </div>
  );
};

export default SoulAndLogic;