import React from 'react';
import { EvidenceItem } from '../types/evidence.types';
import './ChainOfCustodyModal.css';

const ChainOfCustodyModal: React.FC<{ evidenceData: EvidenceItem; onClose: () => void }> = ({ evidenceData, onClose }) => {
  const chainOfCustody = evidenceData.chainOfCustody || [];

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <h3>Chain of Custody</h3>
        {chainOfCustody.length === 0 ? (
          <p>No chain of custody records available.</p>
        ) : (
          <ul>
            {chainOfCustody.map((entry, index) => (
              <li key={index}>
                <strong>{entry.action}</strong> by {entry.handledBy} on {new Date(entry.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default ChainOfCustodyModal;