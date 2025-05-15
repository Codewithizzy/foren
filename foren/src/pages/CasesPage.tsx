import React, { useState, useMemo } from 'react';
import './CasesPage.css';
import { useNavigate } from 'react-router-dom';
import { useCaseContext } from '../context/CaseContext';
import { CaseItem } from '../types/cases.types';
import EditCaseModal from '../components/EditCaseModal';
import AddCaseModal from '../components/AddCaseModal';
import Pagination from '../components/Pagination';

const CasesPage: React.FC = () => {
  const { cases, updateCase, addCase } = useCaseContext();
  const navigate = useNavigate();

  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [sortBy, setSortBy] = useState<keyof CaseItem>('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredCases = useMemo(() => {
    return cases
      .filter((c) => {
        const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
        const matchesSearch =
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => a[sortBy].toString().localeCompare(b[sortBy].toString()));
  }, [cases, sortBy, filterStatus, searchTerm]);

  const paginatedCases = filteredCases.slice((page - 1) * pageSize, page * pageSize);

  const handleEditSave = (updatedCase: CaseItem) => {
    updateCase(updatedCase);
    setShowEditModal(false);
  };

  const handleSort = (field: keyof CaseItem) => {
    setSortBy(field);
  };

  const handleAddCase = () => {
    setShowAddModal(true);
  };

  return (
    <div className="casesContainer">
      <header className="casesHeader">
        <h2>Cases</h2>
        <div className="headerActions">
          <div className="filterBar">
            <input
              type="text"
              placeholder="Search by title or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <button className="addBtn" onClick={handleAddCase}>Add Case</button>
        </div>
      </header>

      <table className="casesTable">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th onClick={() => handleSort('assignedTo')}>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCases.length === 0 ? (
            <tr>
              <td colSpan={5} className="noResults">No cases match your search or filter.</td>
            </tr>
          ) : (
            paginatedCases.map((c) => (
              <tr
                key={c.id}
                onClick={() => navigate(`/cases/${c.id}`)}
                className="clickableRow"
              >
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td className={`status ${c.status.toLowerCase()}`}>{c.status}</td>
                <td>{c.assignedTo}</td>
                <td>
                  <button
                    className="editBtn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents navigating when clicking Edit
                      setSelectedCase(c);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalItems={filteredCases.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      {showAddModal && (
        <AddCaseModal
          onSave={(newCase) => {
            addCase(newCase);
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {selectedCase && showEditModal && (
        <EditCaseModal
          caseData={selectedCase}
          onSave={handleEditSave}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default CasesPage;
