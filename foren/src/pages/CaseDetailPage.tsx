import React from 'react';
import CaseTimeline from '../components/CaseTimeline';
import EvidenceList from '../components/EvidenceList';
import SuspectsPanel from '../components/SuspectsPanel';

const CaseDetailPage: React.FC = () => {
  return (
    <div>
      <h2>Case Details</h2>
      <CaseTimeline />
      <EvidenceList />
      <SuspectsPanel />
    </div>
  );
};

export default CaseDetailPage;
