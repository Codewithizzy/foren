import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCaseContext } from '../context/CaseContext';
import AddCaseModal from '../components/AddCaseModal';
import './DashboardPage.css';

interface StatCard {
  label: string;
  count: number;
  link?: string;
}

interface ActivityItem {
  id: string;
  description: string;
  date: string;
  type: 'case' | 'evidence';
  completed?: boolean;
}

const DashboardPage: React.FC = () => {
  const { cases, evidence, addCase } = useCaseContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter cases and evidence based on search term
  const filteredCases = useMemo(() => {
    if (!searchTerm) return cases;
    return cases.filter(c => 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cases, searchTerm]);

  const filteredEvidence = useMemo(() => {
    if (!searchTerm) return evidence;
    return evidence.filter(e => 
      e.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
      e.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [evidence, searchTerm]);

  // Calculate statistics based on filtered data
  const stats: StatCard[] = useMemo(() => [
    { 
      label: 'Total Cases', 
      count: filteredCases.length,
      link: `/cases?search=${searchTerm}`
    },
    { 
      label: 'Open Cases', 
      count: filteredCases.filter(c => c.status === 'Open').length,
      link: `/cases?status=Open&search=${searchTerm}`
    },
    { 
      label: 'Closed Cases', 
      count: filteredCases.filter(c => c.status === 'Closed').length,
      link: `/cases?status=Closed&search=${searchTerm}`
    },
    {
      label: 'Total Evidence',
      count: filteredEvidence.length,
      link: `/evidence?search=${searchTerm}`
    }
  ], [filteredCases, filteredEvidence, searchTerm]);

  // Generate activity feed from filtered cases and evidence
  const activityFeed: ActivityItem[] = useMemo(() => [
    ...filteredCases.slice(0, 3).map(c => ({
      id: c.id,
      description: `${c.status === 'Open' ? 'Opened' : 'Closed'} case: ${c.title}`,
      date: new Date(c.lastUpdated || c.createdAt).toISOString(),
      type: 'case' as const,
      completed: c.status === 'Closed'
    })),
    ...filteredEvidence.slice(0, 2).map(e => ({
      id: e.id,
      description: `Added evidence (${e.type}) to case`,
      date: new Date(e.createdAt).toISOString(),
      type: 'evidence' as const,
      completed: false
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), 
  [filteredCases, filteredEvidence]);

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const handleAddCase = (newCase: CaseItem) => {
    addCase(newCase);
    setShowAddModal(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filteredCases/filteredEvidence
  };

  return (
    <div className="dashboardContainer">
      <header className="dashboardHeader">
        <h1>Dashboard</h1>
        <form className="searchContainer" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search cases or evidence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />
          <button type="submit" className="searchButton">Search</button>
        </form>
      </header>

      <div className="dashboardGrid">
        <div className="leftPanel">
          <section className="statsSection">
            <h2>Case Overview</h2>
            <div className="statsGrid">
              {stats.map((stat) => (
                <Link 
                  to={stat.link || '#'} 
                  key={stat.label} 
                  className="statCardLink"
                >
                  <div className="statCard">
                    <h3>{stat.count}</h3>
                    <p>{stat.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="recentActivity">
            <h2>Recent Activity</h2>
            {activityFeed.length === 0 ? (
              <p className="noResults">No matching activities found</p>
            ) : (
              <ul className="activityList">
                {activityFeed.map((item) => (
                  <li 
                    key={item.id} 
                    className={`activityItem ${item.completed ? 'completed' : ''}`}
                    onClick={() => {
                      if (item.type === 'case') {
                        window.location.href = `/cases/${item.id}`;
                      } else {
                        const evidenceItem = evidence.find(e => e.id === item.id);
                        if (evidenceItem) {
                          window.location.href = `/cases/${evidenceItem.relatedTo}?tab=Evidence`;
                        }
                      }
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={item.completed || false} 
                      readOnly 
                      className="activityCheckbox" 
                    />
                    <div className="activityContent">
                      <p className="activityDescription">{item.description}</p>
                      <span className="activityDate">
                        {formatRelativeTime(item.date)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="quickActions">
          <button 
            className="primaryAction" 
            onClick={() => setShowAddModal(true)}
          >
            + New Case
          </button>
          
          <div className="actionGrid">
            <div className="actionRow">
              <Link to="/evidence" className="actionButton">
                Add/Edit Evidence
              </Link>
              <Link to="/court-statements" className="actionButton">
                Generate Court Statement
              </Link>
            </div>
            <div className="actionRow">
              <Link to="/crime-analysis" className="actionButton">
                Crime Scene Analysis
              </Link>
              <Link to="/evidence-analysis" className="actionButton">
                Evidence Analysis
              </Link>
            </div>
            <div className="actionRow">
              <Link to="/message-analysis" className="actionButton">
                Message Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddCaseModal
          onSave={handleAddCase}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;