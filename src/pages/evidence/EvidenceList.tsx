// EvidenceList.tsx
import React, { useState } from 'react';
import { 
  Database, Filter, Plus, Search, 
  FileText, FileImage, FileVideo, 
  FileAudio, File, ChevronDown, ChevronUp
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Evidence, Case, User } from '../../types';

// Mock data
const mockEvidence: Evidence[] = [
  {
    id: '1',
    caseId: 'case-001',
    type: 'photo',
    title: 'Crime Scene Overview',
    description: 'Full view of apartment living room',
    fileUrl: 'https://images.pexels.com/photos/4493205/pexels-photo-4493205.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumbnail: 'https://images.pexels.com/photos/4493205/pexels-photo-4493205.jpeg?auto=compress&cs=tinysrgb&w=100',
    tags: ['living room', 'entry point', 'fingerprints'],
    uploadedBy: '2',
    uploadedAt: new Date('2023-11-15T10:30:00'),
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '123 Main St, Los Angeles, CA'
    },
    aiAnalysis: {
      labels: ['room', 'furniture', 'window', 'door'],
      objects: [
        { name: 'window', confidence: 0.92 },
        { name: 'chair', confidence: 0.87 },
        { name: 'table', confidence: 0.95 }
      ]
    }
  },
  {
    id: '2',
    caseId: 'case-001',
    type: 'photo',
    title: 'Footprint Evidence',
    description: 'Shoe print found near back door',
    fileUrl: 'https://images.pexels.com/photos/6059631/pexels-photo-6059631.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumbnail: 'https://images.pexels.com/photos/6059631/pexels-photo-6059631.jpeg?auto=compress&cs=tinysrgb&w=100',
    tags: ['footprint', 'shoe', 'back door'],
    uploadedBy: '2',
    uploadedAt: new Date('2023-11-15T11:15:00'),
    aiAnalysis: {
      labels: ['footprint', 'soil', 'shoe impression'],
      objects: [
        { name: 'footprint', confidence: 0.98 }
      ]
    }
  },
  {
    id: '3',
    caseId: 'case-002',
    type: 'document',
    title: 'Witness Statement',
    description: 'Statement from neighbor John Doe',
    fileUrl: '/files/statement.pdf',
    tags: ['witness', 'statement', 'neighbor'],
    uploadedBy: '3',
    uploadedAt: new Date('2023-11-14T09:45:00'),
    aiAnalysis: {
      labels: ['document', 'text', 'statement'],
      summary: 'Witness reports seeing a tall male in dark clothing entering the premises at approximately 11:30pm.'
    }
  },
  {
    id: '4',
    caseId: 'case-002',
    type: 'video',
    title: 'Security Camera Footage',
    description: 'Front entrance camera recording',
    fileUrl: '/files/security.mp4',
    thumbnail: 'https://images.pexels.com/photos/8089152/pexels-photo-8089152.jpeg?auto=compress&cs=tinysrgb&w=100',
    tags: ['video', 'security', 'entrance'],
    uploadedBy: '2',
    uploadedAt: new Date('2023-11-14T16:20:00'),
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '123 Main St, Los Angeles, CA'
    },
    aiAnalysis: {
      labels: ['person', 'doorway', 'night', 'movement'],
      objects: [
        { name: 'person', confidence: 0.94 },
        { name: 'door', confidence: 0.91 }
      ]
    }
  },
  {
    id: '5',
    caseId: 'case-003',
    type: 'audio',
    title: '911 Call Recording',
    description: 'Emergency call from reporting witness',
    fileUrl: '/files/call.mp3',
    tags: ['audio', '911', 'emergency', 'call'],
    uploadedBy: '3',
    uploadedAt: new Date('2023-11-13T08:05:00'),
    aiAnalysis: {
      labels: ['voice', 'distress', 'emergency call'],
      summary: 'Female caller reporting break-in. Background noises suggest multiple people in the vicinity.'
    }
  }
];

const mockCases: Case[] = [
  { id: 'case-001', title: 'Burglary at 123 Main St', description: 'Forced entry through backdoor. Jewelry and electronics stolen.', status: 'active', createdAt: new Date('2025-01-15T08:30:00Z'), updatedAt: new Date('2025-01-20T10:45:00Z'), assignedTo: ['1', '2'], evidenceCount: 5 },
  { id: 'case-002', title: 'Vandalism in Downtown', description: 'Graffiti found on multiple storefronts. Surveillance footage being reviewed.', status: 'closed', createdAt: new Date('2024-12-05T12:00:00Z'), updatedAt: new Date('2024-12-15T09:20:00Z'), assignedTo: ['2', '3'], evidenceCount: 3 },
  { id: 'case-003', title: 'Hit and Run on 5th Ave', description: 'Witnesses report a black SUV leaving the scene. Victim hospitalized.', status: 'pending', createdAt: new Date('2025-03-10T14:15:00Z'), updatedAt: new Date('2025-03-12T16:00:00Z'), assignedTo: ['1'], evidenceCount: 4 }
];

const mockUsers: User[] = [
  { id: '1', name: 'John Smith', role: 'admin', email: 'john.smith@example.com' },
  { id: '2', name: 'Emma Wilson', role: 'forensic_officer', email: 'emma.wilson@example.com' },
  { id: '3', name: 'Michael Chen', role: 'investigator', email: 'michael.chen@example.com' }
];

const EvidenceList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>(null);
  const navigate = useNavigate();

  // Filter evidence based on search query and filters
  const filteredEvidence = mockEvidence.filter((evidence) => {
    const matchesSearch = 
      evidence.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evidence.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evidence.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType ? evidence.type === selectedType : true;
    const matchesCase = selectedCase ? evidence.caseId === selectedCase : true;
    
    return matchesSearch && matchesType && matchesCase;
  });

  // Sort evidence
  const sortedEvidence = [...filteredEvidence].sort((a, b) => {
    if (!sortConfig) return 0;
    
    if (a[sortConfig.key as keyof Evidence] < b[sortConfig.key as keyof Evidence]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key as keyof Evidence] > b[sortConfig.key as keyof Evidence]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo':
        return <FileImage className="h-5 w-5 text-blue-400" />;
      case 'document':
        return <FileText className="h-5 w-5 text-green-400" />;
      case 'video':
        return <FileVideo className="h-5 w-5 text-red-400" />;
      case 'audio':
        return <FileAudio className="h-5 w-5 text-yellow-400" />;
      default:
        return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const toggleExpand = (id: string) => {
    setExpandedEvidence(expandedEvidence === id ? null : id);
  };

  const getCaseTitle = (caseId: string) => {
    const caseItem = mockCases.find(c => c.id === caseId);
    return caseItem ? caseItem.title : caseId;
  };

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-white">Evidence Management</h1>
        </div>
        <Link
          to="/evidence/upload"
          className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Evidence
        </Link>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search evidence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-gray-400">
              <Filter size={18} />
            </div>
            <select
              value={selectedType || ''}
              onChange={(e) => setSelectedType(e.target.value || null)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="photo">Photos</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-gray-400">
              <Database size={18} />
            </div>
            <select
              value={selectedCase || ''}
              onChange={(e) => setSelectedCase(e.target.value || null)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Cases</option>
              {mockCases.map((caseItem) => (
                <option key={caseItem.id} value={caseItem.id}>
                  {caseItem.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('title')}>
                  <div className="flex items-center">
                    Evidence
                    {sortConfig?.key === 'title' && (
                      sortConfig.direction === 'ascending' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('caseId')}>
                  <div className="flex items-center">
                    Case
                    {sortConfig?.key === 'caseId' && (
                      sortConfig.direction === 'ascending' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('type')}>
                  <div className="flex items-center">
                    Type
                    {sortConfig?.key === 'type' && (
                      sortConfig.direction === 'ascending' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('uploadedAt')}>
                  <div className="flex items-center">
                    Uploaded
                    {sortConfig?.key === 'uploadedAt' && (
                      sortConfig.direction === 'ascending' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {sortedEvidence.map((evidence) => (
                <React.Fragment key={evidence.id}>
                  <tr className="hover:bg-gray-750 cursor-pointer" onClick={() => toggleExpand(evidence.id)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {evidence.thumbnail ? (
                          <img 
                            src={evidence.thumbnail} 
                            alt={evidence.title} 
                            className="h-10 w-10 object-cover rounded"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded bg-gray-700 flex items-center justify-center">
                            {getTypeIcon(evidence.type)}
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{evidence.title}</div>
                          <div className="text-sm text-gray-400">{evidence.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {getCaseTitle(evidence.caseId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTypeIcon(evidence.type)}
                        <span className="ml-1.5 text-sm text-gray-300 capitalize">{evidence.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div>{formatDate(evidence.uploadedAt)}</div>
                      <div className="text-xs text-gray-500">by {getUserName(evidence.uploadedBy)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {evidence.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                            {tag}
                          </span>
                        ))}
                        {evidence.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                            +{evidence.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/evidence/${evidence.id}`} 
                        className="text-blue-500 hover:text-blue-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                  {expandedEvidence === evidence.id && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-gray-750">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Details</h4>
                            <div className="text-sm text-white space-y-1">
                              <p><span className="text-gray-400">Uploaded by:</span> {getUserName(evidence.uploadedBy)}</p>
                              {evidence.location && (
                                <p><span className="text-gray-400">Location:</span> {evidence.location.address}</p>
                              )}
                              <p><span className="text-gray-400">File:</span> 
                                <a 
                                  href={evidence.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:text-blue-400 ml-1"
                                >
                                  {evidence.fileUrl.split('/').pop()}
                                </a>
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Quick Actions</h4>
                            <div className="flex space-x-2">
                              <button 
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                                onClick={() => navigate(`/evidence/${evidence.id}`)}
                              >
                                View Details
                              </button>
                              <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm">
                                Download
                              </button>
                              <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm">
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedEvidence.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            <Database className="h-12 w-12 mx-auto mb-3 text-gray-600" />
            <p>No evidence found matching your criteria.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedType(null);
                setSelectedCase(null);
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceList;