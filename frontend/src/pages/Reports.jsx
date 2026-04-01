import React from 'react';
import SpendingBreakdown from '../components/SpendingBreakdown';

const Reports = () => {
  return (
    <div>
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '32px' }}>
        Reports
      </h1>
      <SpendingBreakdown />
    </div>
  );
};

export default Reports;
