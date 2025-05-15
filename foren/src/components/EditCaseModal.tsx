// Rename to EditCaseModal.tsx for clarity (optional)
import React, { useState } from 'react';
import './CaseModal.css';
import { CaseItem } from '../types/cases.types';

interface Props {
  caseData: CaseItem;
  onSave: (updated: CaseItem) => void;
  onClose: () => void;
}

const EditCaseModal: React.FC<Props> = ({ caseData, onSave, onClose }) => {
  const [status, setStatus] = useState<'Open' | 'Closed'>(caseData.status);
  const [assignedTo, setAssignedTo] = useState(caseData.assignedTo);

  const handleSubmit = () => {
    const updatedCase = { ...caseData, status };

    if (assignedTo !== caseData.assignedTo) {
      updatedCase.assignedTo = assignedTo;
      updatedCase.history = [
        ...caseData.history,
        { assignedTo, changedAt: new Date().toISOString() },
      ];
    }

    onSave(updatedCase);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3>Edit Case: {caseData.id}</h3>
        <label>Status:
          <select value={status} onChange={(e) => setStatus(e.target.value as 'Open' | 'Closed')}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <label>Assigned To:
          <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
        </label>

        <h4>Assignment History</h4>
        <ul>
          {caseData.history.map((entry, idx) => (
            <li key={idx}>
              {entry.assignedTo} — {new Date(entry.changedAt).toLocaleString()}
            </li>
          ))}
        </ul>

        <div className="modalActions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditCaseModal;
