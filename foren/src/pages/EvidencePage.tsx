import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import './EvidencePage.css';
import { useCaseContext } from '../context/CaseContext';
import { EvidenceItem } from '../types/evidence.types';
import AddEvidenceModal from '../components/AddEvidenceModal';
import Pagination from '../components/Pagination';

const EvidencePage: React.FC = () => {
  const { cases, evidence, getEvidenceForCase, addEvidence } = useCaseContext();
  const navigate = useNavigate();

  const [selectedCaseId, setSelectedCaseId] = useState<string>('');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvidenceType, setNewEvidenceType] = useState<string>('');
  const [newEvidenceCollectedBy, setNewEvidenceCollectedBy] = useState<string>('');

  const [sortField, setSortField] = useState<keyof EvidenceItem>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setPage(1);
  }, [selectedCaseId, searchTerm, selectedDateFilter]);

  const filterEvidenceByDate = (evidenceList: EvidenceItem[]) => {
    if (selectedDateFilter === 'all') return evidenceList;

    const today = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (selectedDateFilter === 'month') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (selectedDateFilter === 'year') {
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(today.getFullYear(), 11, 31);
    } else if (selectedDateFilter === 'custom' && customStartDate && customEndDate) {
      startDate = new Date(customStartDate);
      endDate = new Date(customEndDate);
    }

    if (startDate && endDate) {
      return evidenceList.filter((e) => {
        const evidenceDate = new Date(e.createdAt);
        return evidenceDate >= startDate && evidenceDate <= endDate;
      });
    }

    return evidenceList;
  };

  const filteredAndSortedEvidence = useMemo(() => {
    const caseFiltered = selectedCaseId
      ? getEvidenceForCase(selectedCaseId)
      : evidence;

    const fuse = new Fuse(caseFiltered, {
      keys: [
        'id',
        'type',
        'relatedTo',
        'collectedBy',
        {
          name: 'caseTitle',
          getFn: (item: EvidenceItem) =>
            cases.find((c) => c.id === item.relatedTo)?.title ?? '',
        },
      ],
      threshold: 0.4,
    });

    const searchFiltered = searchTerm
      ? fuse.search(searchTerm).map((res) => res.item)
      : caseFiltered;

    const dateFiltered = filterEvidenceByDate(searchFiltered);

    return dateFiltered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [
    evidence,
    searchTerm,
    selectedCaseId,
    selectedDateFilter,
    customStartDate,
    customEndDate,
    cases,
    sortField,
    sortOrder,
    getEvidenceForCase,
  ]);

  const paginatedEvidence = filteredAndSortedEvidence.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleAddEvidence = () => {
    if (selectedCaseId && newEvidenceType && newEvidenceCollectedBy) {
      const newEvidence: EvidenceItem = {
        id: `E-${Date.now()}`,
        type: newEvidenceType,
        relatedTo: selectedCaseId,
        collectedBy: newEvidenceCollectedBy,
        createdAt: new Date().toISOString(),
      };
      addEvidence(newEvidence);
      setNewEvidenceType('');
      setNewEvidenceCollectedBy('');
      setShowAddModal(false);
    }
  };

  const handleSort = (field: keyof EvidenceItem) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="evidenceContainer">
      <header className="evidenceHeader">
        <h2>Evidence Management</h2>
        <div className="headerActions">
          <div className="filterBar">
            <input
              type="text"
              placeholder="Search by type, ID, or case title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={selectedDateFilter} onChange={(e) => setSelectedDateFilter(e.target.value)}>
              <option value="all">All Dates</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Date Range</option>
            </select>
            {selectedDateFilter === 'custom' && (
              <div className="customDateRange">
                <input type="date" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} />
                <input type="date" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} />
              </div>
            )}
          </div>
          <button className="addBtn" onClick={() => setShowAddModal(true)}>
            + Add Evidence
          </button>
        </div>
      </header>

      <h3>
        {selectedCaseId
          ? `Evidence for Case: ${cases.find((c) => c.id === selectedCaseId)?.title || selectedCaseId}`
          : 'All Evidence'}
      </h3>
      <table className="evidenceTable">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('type')}>Type</th>
            <th onClick={() => handleSort('relatedTo')}>Related Case</th>
            <th onClick={() => handleSort('collectedBy')}>Collected By</th>
            <th onClick={() => handleSort('createdAt')}>Date</th>
            <th onClick={() => handleSort('createdAt')}>Time</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEvidence.length === 0 ? (
            <tr>
              <td colSpan={6} className="noResults">
                No evidence matches your search or filter.
              </td>
            </tr>
          ) : (
            paginatedEvidence.map((e) => {
              const date = new Date(e.createdAt);
              return (
                <tr 
                  key={e.id} 
                  onClick={() => navigate(`/cases/${e.relatedTo}?tab=Evidence`)} 
                  className="clickableRow"
                >
                  <td>{e.id}</td>
                  <td>{e.type}</td>
                  <td>{e.relatedTo}</td>
                  <td>{e.collectedBy}</td>
                  <td>{date.toLocaleDateString()}</td>
                  <td>{date.toLocaleTimeString()}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalItems={filteredAndSortedEvidence.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      {showAddModal && (
        <AddEvidenceModal onSave={handleAddEvidence} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default EvidencePage;