import React from 'react';
import EvidenceDetail from '../components/EvidenceDetail';
import FootwearComparison from '../components/FootwearComparison';

const EvidencePage: React.FC = () => {
  return (
    <div>
      <h2>Evidence Details</h2>
      <EvidenceDetail />
      <FootwearComparison />
    </div>
  );
};

export default EvidencePage;
