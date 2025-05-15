import React, { useState } from 'react';
import './EvidenceModal.css';
import { EvidenceItem } from '../types/evidence.types';

interface Props {
  onSave: (newEvidence: EvidenceItem) => void;
  onClose: () => void;
}

const AddEvidenceModal: React.FC<Props> = ({ onSave, onClose }) => {
  const [type, setType] = useState('');
  const [relatedTo, setRelatedTo] = useState('');
  const [collectedBy, setCollectedBy] = useState('');

  const generateReadableId = () => {
    const timestamp = Date.now(); 
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNum}`; 
  };

  const handleSubmit = () => {
    const currentDate = new Date(); // Define currentDate here
    const newEvidence: EvidenceItem = {
      id: generateReadableId(),
      type,
      relatedTo,
      collectedBy,
      date: currentDate.toLocaleDateString(), 
      time: currentDate.toLocaleTimeString(),
    };

    onSave(newEvidence);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3>Add New Evidence</h3>
        
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
          <button onClick={handleSubmit} disabled={!type.trim() || !relatedTo.trim() || !collectedBy.trim()}>
            Add Evidence
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvidenceModal;
