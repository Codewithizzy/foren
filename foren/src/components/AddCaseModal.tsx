import React, { useState } from 'react';
import './CaseModal.css';
import { CaseItem } from '../types/cases.types';

interface Props {
  onSave: (newCase: CaseItem) => void;
  onClose: () => void;
}

const AddCaseModal: React.FC<Props> = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'Open' | 'Closed'>('Open');
  const [assignedTo, setAssignedTo] = useState('');
  
  const generateReadableId = () => {
    const timestamp = Date.now(); 
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNum}`; 
  };
  const handleSubmit = () => {
    const newCase: CaseItem = {
      id: generateReadableId(), 
      title,
      status,
      assignedTo,
      createdAt: new Date().toISOString(),
      history: assignedTo ? [
        { assignedTo, changedAt: new Date().toISOString() }
      ] : [],
    };

    onSave(newCase);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3>Add New Case</h3>
        <label>Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>Status:
          <select value={status} onChange={(e) => setStatus(e.target.value as 'Open' | 'Closed')}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <label>Assigned To:
          <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
        </label>

        <div className="modalActions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={!title.trim()}>Add Case</button>
        </div>
      </div>
    </div>
  );
};

export default AddCaseModal;
