import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import '../pages/EvidencePage.css';
import { useCaseContext } from '../context/CaseContext';
import { EvidenceItem } from '../types/evidence.types';
import ChainOfCustodyModal from './ChainOfCustodyModal';
import EditEvidenceModal from './EditEvidenceModal';
import AddEvidenceModal from './AddEvidenceModal';
import Pagination from './Pagination';

interface EvidenceManagerProps {
  caseId?: string;
}

const EvidenceManager: React.FC<EvidenceManagerProps> = ({ caseId }) => {
  const { cases, evidence, getEvidenceForCase, updateEvidence, addEvidence } = useCaseContext();

  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [sortBy, setSortBy] = useState<keyof EvidenceItem>('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEvidenceType, setNewEvidenceType] = useState('');
  const [newEvidenceCollectedBy, setNewEvidenceCollectedBy] = useState('');
  const [showChainOfCustodyModal, setShowChainOfCustodyModal] = useState(false);

  const filteredEvidence = useMemo(() => {
    const caseFiltered = caseId
      ? evidence.filter((e) => e.relatedTo === caseId)
      : evidence;

    const fuse = new Fuse(caseFiltered, {
      keys: ['id', 'type', 'relatedTo', 'collectedBy', {
        name: 'caseTitle',
        getFn: (item: EvidenceItem) =>
          cases.find((c) => c.id === item.relatedTo)?.title ?? '',
      }],
      threshold: 0.4,
    });

    const results = searchTerm
      ? fuse.search(searchTerm).map((res) => res.item)
      : caseFiltered;

    return results.sort((a, b) =>
      a[sortBy].toString().localeCompare(b[sortBy].toString())
    );
  }, [evidence, sortBy, searchTerm, caseId, cases]);

  const paginatedEvidence = filteredEvidence.slice((page - 1) * pageSize, page * pageSize);

  const handleAddEvidence = () => {
    if (caseId && newEvidenceType && newEvidenceCollectedBy) {
      const newEvidence: EvidenceItem = {
        id: `E-${Date.now()}`,
        type: newEvidenceType,
        relatedTo: caseId,
        collectedBy: newEvidenceCollectedBy,
        chainOfCustody: [
          {
            timestamp: new Date().toISOString(),
            action: 'Evidence Collected',
            handledBy: newEvidenceCollectedBy,
          },
        ],
      };

      addEvidence(newEvidence);
      setNewEvidenceType('');
      setNewEvidenceCollectedBy('');
      setShowAddModal(false);
    }
  };

  const handleEditSave = (updatedEvidence: EvidenceItem) => {
    const updatedEvidenceWithCustody = {
      ...updatedEvidence,
      chainOfCustody: [
        ...updatedEvidence.chainOfCustody,
        {
          timestamp: new Date().toISOString(),
          action: 'Evidence Updated',
          handledBy: 'Admin', // Replace with current user name if possible
        },
      ],
    };

    updateEvidence(updatedEvidenceWithCustody);
    setShowEditModal(false);
  };

  const handleSort = (field: keyof EvidenceItem) => setSortBy(field);

  const handleViewChainOfCustody = (evidenceItem: EvidenceItem) => {
    setSelectedEvidence(evidenceItem);
    setShowChainOfCustodyModal(true);
  };

  return (
    <div className="evidenceTabInner">
      <div className="evidenceActions">
        <input
          type="text"
          placeholder="Search evidence..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setShowAddModal(true)}>+ Add Evidence</button>
      </div>

      <table className="evidenceTable">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('type')}>Type</th>
            <th onClick={() => handleSort('collectedBy')}>Collected By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEvidence.length === 0 ? (
            <tr><td colSpan={4}>No evidence found.</td></tr>
          ) : (
            paginatedEvidence.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.type}</td>
                <td>{e.collectedBy}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedEvidence(e);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleViewChainOfCustody(e)}>
                    View Chain of Custody
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalItems={filteredEvidence.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      {showAddModal && (
        <AddEvidenceModal onSave={handleAddEvidence} onClose={() => setShowAddModal(false)} />
      )}

      {selectedEvidence && showEditModal && (
        <EditEvidenceModal
          evidenceData={selectedEvidence}
          onSave={handleEditSave}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {selectedEvidence && showChainOfCustodyModal && (
        <ChainOfCustodyModal
          evidenceData={selectedEvidence}
          onClose={() => setShowChainOfCustodyModal(false)}
        />
      )}
    </div>
  );
};

export default EvidenceManager;
