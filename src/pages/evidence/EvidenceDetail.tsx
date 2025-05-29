import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, File, FileImage, FileText, 
  FileVideo, FileAudio, Download, History, 
  Tag, MapPin, Clock, Shield, Eye
} from 'lucide-react';
import { Evidence, CustodyLog } from '../../types';

// Mock evidence data - in a real app this would come from an API
const mockEvidence: Record<string, Evidence> = {
  '1': {
    id: '1',
    caseId: 'case-001',
    type: 'photo',
    title: 'Crime Scene Overview',
    description: 'Full view of apartment living room',
    fileUrl: 'https://images.pexels.com/photos/4493205/pexels-photo-4493205.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
  '2': {
    id: '2',
    caseId: 'case-001',
    type: 'photo',
    title: 'Footprint Evidence',
    description: 'Shoe print found near back door',
    fileUrl: 'https://images.pexels.com/photos/6059631/pexels-photo-6059631.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
  }
};

// Mock custody logs
const mockCustodyLogs: CustodyLog[] = [
  {
    id: '1',
    evidenceId: '1',
    action: 'upload',
    userId: '2',
    timestamp: new Date('2023-11-15T10:30:00'),
    notes: 'Initial upload of crime scene photo',
    hash: '8f7d88e4c2a74b9b8e9a',
    previousHash: '0000000000000000'
  },
  {
    id: '2',
    evidenceId: '1',
    action: 'view',
    userId: '1',
    timestamp: new Date('2023-11-15T14:22:00'),
    hash: '2c3a9b8f7d88e4c2a7',
    previousHash: '8f7d88e4c2a74b9b8e9a'
  },
  {
    id: '3',
    evidenceId: '1',
    action: 'download',
    userId: '3',
    timestamp: new Date('2023-11-16T09:15:00'),
    notes: 'Downloaded for lab analysis',
    hash: '9b8f7d88e4c2a74b9b',
    previousHash: '2c3a9b8f7d88e4c2a7'
  }
];

// Mock users
const mockUsers: Record<string, { name: string; role: string }> = {
  '1': { name: 'John Smith', role: 'Admin' },
  '2': { name: 'Emma Wilson', role: 'Forensic Officer' },
  '3': { name: 'Michael Chen', role: 'Investigator' }
};

const EvidenceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'custody'>('overview');
  
  const evidence = id ? mockEvidence[id] : null;
  const custodyLogs = mockCustodyLogs.filter(log => log.evidenceId === id);
  
  if (!evidence) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-400 mb-4">Evidence not found</p>
        <Link
          to="/evidence"
          className="flex items-center text-blue-500 hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Evidence List
        </Link>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo':
        return <FileImage className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <FileVideo className="h-5 w-5" />;
      case 'audio':
        return <FileAudio className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
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

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Evidence Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Title</p>
            <p className="text-white">{evidence.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Case ID</p>
            <p className="text-white">{evidence.caseId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Description</p>
            <p className="text-white">{evidence.description}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Type</p>
            <div className="flex items-center">
              <span className="text-blue-500">{getTypeIcon(evidence.type)}</span>
              <span className="ml-1.5 text-white capitalize">{evidence.type}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Uploaded By</p>
            <p className="text-white">{mockUsers[evidence.uploadedBy]?.name || 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Upload Date</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-white">{formatDate(evidence.uploadedAt)}</span>
            </div>
          </div>
          {evidence.location && (
            <div className="col-span-1 md:col-span-2">
              <p className="text-sm text-gray-400 mb-1">Location</p>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-white">{evidence.location.address}</span>
              </div>
            </div>
          )}
          <div className="col-span-1 md:col-span-2">
            <p className="text-sm text-gray-400 mb-1">Tags</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {evidence.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 rounded-full bg-gray-700 text-gray-300 text-sm flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <div className="p-4 bg-gray-750 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-medium text-white">Evidence Preview</h3>
          <button className="flex items-center text-sm text-blue-500 hover:text-blue-400">
            <Download className="h-4 w-4 mr-1" />
            Download Original
          </button>
        </div>
        <div className="p-6">
          {evidence.type === 'photo' && (
            <div className="flex justify-center">
              <img 
                src={evidence.fileUrl} 
                alt={evidence.title} 
                className="max-h-96 object-contain rounded-md" 
              />
            </div>
          )}
          {evidence.type === 'document' && (
            <div className="flex justify-center items-center h-64 bg-gray-900 rounded-md">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                <p className="text-white">{evidence.title}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
                  View Document
                </button>
              </div>
            </div>
          )}
          {evidence.type === 'video' && (
            <div className="flex justify-center items-center h-64 bg-gray-900 rounded-md">
              <div className="text-center">
                <FileVideo className="h-12 w-12 mx-auto text-red-500 mb-2" />
                <p className="text-white">Video Preview</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
                  Play Video
                </button>
              </div>
            </div>
          )}
          {evidence.type === 'audio' && (
            <div className="flex justify-center items-center h-32 bg-gray-900 rounded-md">
              <div className="text-center">
                <FileAudio className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <p className="text-white">Audio Recording</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
                  Play Audio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAnalysisTab = () => (
    <div className="space-y-6">
      {evidence.aiAnalysis ? (
        <>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4">AI Analysis Results</h3>
            
            {evidence.aiAnalysis.labels && (
              <div className="mb-6">
                <h4 className="text-sm text-gray-400 mb-2">Detected Labels</h4>
                <div className="flex flex-wrap gap-2">
                  {evidence.aiAnalysis.labels.map((label, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {evidence.aiAnalysis.objects && (
              <div className="mb-6">
                <h4 className="text-sm text-gray-400 mb-2">Detected Objects</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {evidence.aiAnalysis.objects.map((object, index) => (
                    <div key={index} className="bg-gray-750 rounded-md p-3 border border-gray-700">
                      <div className="font-medium text-white mb-1">{object.name}</div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${object.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-400">
                          {Math.round(object.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {evidence.aiAnalysis.summary && (
              <div>
                <h4 className="text-sm text-gray-400 mb-2">Summary</h4>
                <p className="text-white bg-gray-750 p-4 rounded-md border border-gray-700">
                  {evidence.aiAnalysis.summary}
                </p>
              </div>
            )}
          </div>
          
          {evidence.type === 'photo' && evidence.fileUrl && (
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <div className="p-4 bg-gray-750 border-b border-gray-700">
                <h3 className="font-medium text-white">Visual Analysis</h3>
              </div>
              <div className="p-6">
                <div className="flex justify-center">
                  <img 
                    src={evidence.fileUrl} 
                    alt={evidence.title} 
                    className="max-h-96 object-contain rounded-md" 
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm mr-3">
                    Run Footwear Analysis
                  </button>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white text-sm">
                    Enhance Image
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 mb-4">No analysis data available for this evidence</div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
            Run Analysis
          </button>
        </div>
      )}
    </div>
  );

  const renderCustodyTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <div className="p-4 bg-gray-750 border-b border-gray-700 flex items-center">
          <Shield className="h-5 w-5 text-green-500 mr-2" />
          <h3 className="font-medium text-white">Blockchain-Secured Chain of Custody</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-col space-y-6">
            {custodyLogs.map((log, index) => (
              <div key={log.id} className="relative">
                {index !== custodyLogs.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-700"></div>
                )}
                <div className="flex">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 ${
                    log.action === 'upload' ? 'bg-green-900 text-green-500' :
                    log.action === 'view' ? 'bg-blue-900 text-blue-500' :
                    log.action === 'download' ? 'bg-yellow-900 text-yellow-500' :
                    log.action === 'transfer' ? 'bg-purple-900 text-purple-500' :
                    log.action === 'modify' ? 'bg-orange-900 text-orange-500' :
                    'bg-red-900 text-red-500'
                  }`}>
                    {log.action === 'upload' && <FileImage className="h-4 w-4" />}
                    {log.action === 'view' && <Eye className="h-4 w-4" />}
                    {log.action === 'download' && <Download className="h-4 w-4" />}
                    {log.action === 'transfer' && <History className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-750 border border-gray-700 rounded-md p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <div className="flex items-center">
                          <span className="text-white font-medium capitalize">{log.action}</span>
                          <span className="text-gray-400 text-sm mx-2">by</span>
                          <span className="text-white">{mockUsers[log.userId]?.name || 'Unknown'}</span>
                        </div>
                        <div className="text-gray-400 text-sm mt-1 sm:mt-0">
                          {formatDate(log.timestamp)}
                        </div>
                      </div>
                      {log.notes && (
                        <p className="text-gray-300 text-sm mb-3">{log.notes}</p>
                      )}
                      <div className="bg-gray-850 rounded p-2 text-xs font-mono text-gray-400 flex justify-between items-center">
                        <div>
                          <span className="text-gray-500">Hash:</span> {log.hash}
                        </div>
                        <button className="text-blue-500 hover:text-blue-400">Verify</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-3 sm:mb-0">
            <Shield className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-white">All actions on this evidence are secured by blockchain</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
            Request Transfer
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link
          to="/evidence"
          className="flex items-center text-gray-400 hover:text-white mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-white">{evidence.title}</h1>
      </div>

      <div className="bg-gray-850 rounded-lg p-1">
        <div className="flex flex-wrap">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'overview' 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'analysis' 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('analysis')}
          >
            AI Analysis
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'custody' 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('custody')}
          >
            Chain of Custody
          </button>
        </div>
      </div>

      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'analysis' && renderAnalysisTab()}
      {activeTab === 'custody' && renderCustodyTab()}
    </div>
  );
};

export default EvidenceDetail;