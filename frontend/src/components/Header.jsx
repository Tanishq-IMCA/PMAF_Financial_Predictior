import React from 'react';

const Header = () => {
  return (
    <div className="glass-panel header-panel" style={{ textAlign: 'left', marginBottom: '24px' }}>
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>
        Quantum Ledger
      </h1>
      <p style={{ margin: '8px 0 0', color: 'rgba(255, 255, 255, 0.6)' }}>
        Your AI-powered financial forecast
      </p>
    </div>
  );
};

export default Header;
