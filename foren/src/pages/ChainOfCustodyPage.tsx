import React from 'react';
import CustodyTimeline from '../components/CustodyTimeline';
import EvidenceInventory from '../components/EvidenceInventory';

const ChainOfCustodyPage: React.FC = () => {
  return (
    <div>
      <h2>Chain of Custody</h2>
      <CustodyTimeline />
      <EvidenceInventory />
    </div>
  );
};

export default ChainOfCustodyPage;
