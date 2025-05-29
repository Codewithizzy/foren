import React, { useState } from 'react';
import { 
  Database, Filter, Plus, Search, 
  FileText, FileImage, FileVideo, 
  FileAudio, File
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Evidence } from '../../types';

// Mock evidence data
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

const EvidenceList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Filter evidence based on search query and type filter
  const filteredEvidence = mockEvidence.filter((evidence) => {
    const matchesSearch = 
      evidence.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evidence.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evidence.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType ? evidence.type === selectedType : true;
    
    return matchesSearch && matchesType;
  });

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
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
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
              className="bg-gray-700 border border-gray-600 rounded-md py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="photo">Photos</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Evidence
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Case ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Uploaded
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
              {filteredEvidence.map((evidence) => (
                <tr key={evidence.id} className="hover:bg-gray-750">
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
                    {evidence.caseId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(evidence.type)}
                      <span className="ml-1.5 text-sm text-gray-300 capitalize">{evidence.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(evidence.uploadedAt)}
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
                    <Link to={`/evidence/${evidence.id}`} className="text-blue-500 hover:text-blue-400">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredEvidence.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            <Database className="h-12 w-12 mx-auto mb-3 text-gray-600" />
            <p>No evidence found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceList;