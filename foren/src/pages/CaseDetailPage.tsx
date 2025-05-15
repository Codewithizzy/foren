import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useCaseContext } from '../context/CaseContext';
import EvidenceManager from '../components/EvidenceManager';
import './CaseDetailPage.css';

const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cases, updateCase, getUsers, getEvidenceForCase } = useCaseContext();

  const caseData = cases.find(c => c.id === id);
  const initialTab = searchParams.get('tab') as 'Overview' | 'Evidence' | 'Court' | 'Notes' | 'Timeline' || 'Overview';
  const [activeTab, setActiveTab] = useState<'Overview' | 'Evidence' | 'Court' | 'Notes' | 'Timeline'>(initialTab);

  // Form state
  const [editTitle, setEditTitle] = useState('');
  const [editAssignedTo, setEditAssignedTo] = useState('');
  const [editStatus, setEditStatus] = useState<'Open' | 'Pending' | 'Closed'>('Open');
  const [editNotes, setEditNotes] = useState('');
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [noteHistory, setNoteHistory] = useState<{text: string, timestamp: string}[]>([]);

  // Initialize state when caseData is available
  useEffect(() => {
    if (caseData) {
      setEditTitle(caseData.title || '');
      setEditAssignedTo(caseData.assignedTo || '');
      setEditStatus(caseData.status || 'Open');
      setEditNotes(caseData.notes || '');
      setActivityLog(caseData.activityLog || []);
      setNoteHistory(caseData.noteHistory || []);
    }
  }, [caseData]);

  // Update tab when query parameter changes
  useEffect(() => {
    const tabParam = searchParams.get('tab') as 'Overview' | 'Evidence' | 'Court' | 'Notes' | 'Timeline';
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, activeTab]);

  if (!caseData) return <p className="notFound">Case not found.</p>;

  const handleSaveChanges = () => {
    const timestamp = new Date().toLocaleString();
    const newNoteEntry = {
      text: editNotes,
      timestamp: timestamp
    };
    
    const updatedCase = {
      ...caseData,
      title: editTitle,
      assignedTo: editAssignedTo,
      status: editStatus,
      notes: editNotes,
      noteHistory: [...noteHistory, newNoteEntry],
      activityLog: [...activityLog, `Notes updated at ${timestamp}`],
      lastUpdated: new Date().toISOString(),
    };
    
    updateCase(updatedCase);
    setNoteHistory(updatedCase.noteHistory);
    alert('Changes saved successfully.');
  };

  const handleAddActivity = (message: string) => {
    const timestampedMessage = `${new Date().toLocaleString()}: ${message}`;
    setActivityLog(prev => [...prev, timestampedMessage]);
    
    // Auto-save when activity is added
    updateCase({
      ...caseData,
      activityLog: [...activityLog, timestampedMessage],
      lastUpdated: new Date().toISOString(),
    });
  };

  const handleEvidenceAdded = (evidenceId: string) => {
    const evidenceMessage = `Evidence added: ${evidenceId}`;
    handleAddActivity(evidenceMessage);
    
    updateCase({
      ...caseData,
      evidence: [...(caseData.evidence || []), evidenceId],
      lastUpdated: new Date().toISOString(),
    });
  };

  return (
    <div className="caseDetailContainer">
      <div className="caseDetailHeader">
        <h2>Case #{caseData.id}</h2>
        <button className="backButton" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <div className="tabNavigation">
        {['Overview', 'Evidence', 'Court', 'Notes', 'Timeline'].map(tab => (
          <button
            key={tab}
            className={`tabButton ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab as any);
              navigate(`/cases/${id}?tab=${tab}`, { replace: true });
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tabContent">
        {activeTab === 'Overview' && (
          <div className="overviewTab">
            <label>
              <span>Title:</span>
              <input 
                value={editTitle} 
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleSaveChanges}
              />
            </label>

            <label>
              <span>Status:</span>
              <select 
                value={editStatus} 
                onChange={(e) => {
                  setEditStatus(e.target.value);
                  handleSaveChanges();
                }}
              >
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            </label>

            <label>
              <span>Assigned To:</span>
              <select 
                value={editAssignedTo} 
                onChange={(e) => {
                  setEditAssignedTo(e.target.value);
                  handleSaveChanges();
                }}
              >
                {getUsers().map((user) => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))}
              </select>
            </label>

            <p><strong>Created At:</strong> {new Date(caseData.createdAt).toLocaleString()}</p>
            {caseData.lastUpdated && (
              <p><strong>Last Updated:</strong> {new Date(caseData.lastUpdated).toLocaleString()}</p>
            )}

            <div className="notesHistorySection">
              <h3>Case Notes History</h3>
              {noteHistory.length > 0 ? (
                <ul className="notesHistoryList">
                  {noteHistory.map((note, index) => (
                    <li key={index} className="noteEntry">
                      <div className="noteTimestamp">{note.timestamp}</div>
                      <div className="noteContent">{note.text}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notes have been added yet.</p>
              )}
            </div>

            <button className="saveButton" onClick={handleSaveChanges}>
              💾 Save Changes
            </button>
          </div>
        )}

        {activeTab === 'Evidence' && (
          <div className="evidenceTab">
            <EvidenceManager 
              caseId={caseData.id}
              onAddEvidence={handleEvidenceAdded}
            />
          </div>
        )}

        {activeTab === 'Court' && (
          <div className="courtTab">
            <div className="courtActions">
              <h3>Court Statements Management</h3>
              <Link 
                to={`/court-statements?caseId=${caseData.id}`}
                className="manageStatementsBtn"
              >
                Manage Statements for This Case
              </Link>
              <button 
                className="generateStatementBtn"
                onClick={() => navigate(`/court-statements?caseId=${caseData.id}&generate=true`)}
              >
                Generate New Statement
              </button>
            </div>
            
            <div className="caseStatementsList">
              <h4>Existing Statements</h4>
              {caseData.statements && caseData.statements.length > 0 ? (
                <ul>
                  {caseData.statements.map(statementId => (
                    <li key={statementId}>
                      <Link to={`/court-statements?statementId=${statementId}`}>
                        Statement {statementId}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No statements have been created for this case yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Notes' && (
          <div className="notesTab">
            <textarea
              placeholder="Add investigation notes here..."
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              onBlur={handleSaveChanges}
            />
            <button className="saveButton" onClick={handleSaveChanges}>
              💾 Save Notes
            </button>
          </div>
        )}

        {activeTab === 'Timeline' && (
          <div className="timelineTab">
            <h3>Activity Timeline</h3>
            <ul>
              {activityLog.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseDetailPage;