import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCaseContext } from '../context/CaseContext';

const EvidenceDetailsPage = () => {
  const { evidence } = useCaseContext();
  const navigate = useNavigate();
  const { evidenceId } = useParams();

  const selectedEvidence = evidence.find((e) => e.id === evidenceId);

  if (!selectedEvidence) {
    return (
      <div>
        <h2>Evidence Not Found</h2>
        <button onClick={() => navigate('/evidence')}>Back to Evidence List</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{selectedEvidence.type}</h1>
      <p>Collected By: {selectedEvidence.collectedBy}</p>
      <p>Date: {selectedEvidence.date}</p>
      <p>Time: {selectedEvidence.time}</p>
      <button onClick={() => navigate('/evidence')}>Back to Evidence List</button>
    </div>
  );
};

export default EvidenceDetailsPage;
