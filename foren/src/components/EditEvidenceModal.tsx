import React, { useState } from 'react';
import './EvidenceModal.css';
import { EvidenceItem } from '../types/evidence.types';

interface Props {
  evidenceData: EvidenceItem;
  onSave: (updatedEvidence: EvidenceItem) => void;
  onClose: () => void;
}

const EditEvidenceModal: React.FC<Props> = ({ evidenceData, onSave, onClose }) => {
  const [type, setType] = useState(evidenceData.type);
  const [relatedTo, setRelatedTo] = useState(evidenceData.relatedTo);
  const [collectedBy, setCollectedBy] = useState(evidenceData.collectedBy);
  const [chainOfCustody, setChainOfCustody] = useState(
    evidenceData.chainOfCustody || []
  );

  const handleSubmit = () => {
    const updatedEvidence: EvidenceItem = { 
      ...evidenceData,
      type,
      relatedTo,
      collectedBy,
      chainOfCustody: chainOfCustody || [] // Ensure chainOfCustody is always an array
    };

    onSave(updatedEvidence);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3>Edit Evidence: {evidenceData.id}</h3>
        
        <label>Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>

        <label>Related Case ID:
          <input type="text" value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)} />
        </label>

        <label>Collected By:
          <input type="text" value={collectedBy} onChange={(e) => setCollectedBy(e.target.value)} />
        </label>

        <div className="modalActions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditEvidenceModal;