import React from 'react';
import { useNavigate } from 'react-router-dom';

const SokkaLab = () => {
  const navigate = useNavigate();

  return (
    <div className="universe-page">
      <h1>Sokka Lab 🧠</h1>
      <p>Your zone for research, deep dives, and experimental ideas.</p>
      <button onClick={() => navigate('/')}>
        ← Back to Galaxy
      </button>
    </div>
  );
};

export default SokkaLab;