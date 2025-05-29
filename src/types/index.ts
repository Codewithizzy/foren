export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'forensic_officer' | 'investigator';
  profileImage?: string;
}

export interface Evidence {
  id: string;
  caseId: string;
  type: 'photo' | 'document' | 'video' | 'audio' | 'other';
  title: string;
  description: string;
  fileUrl: string;
  thumbnail?: string;
  tags: string[];
  uploadedBy: string;
  uploadedAt: Date;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  aiAnalysis?: {
    labels: string[];
    objects: Array<{
      name: string;
      confidence: number;
      boundingBox?: [number, number, number, number];
    }>;
    summary?: string;
  };
}

export interface Case {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'closed' | 'pending';
  createdAt: Date;
  updatedAt: Date;
  assignedTo: string[];
  evidenceCount: number;
}

export interface CustodyLog {
  id: string;
  evidenceId: string;
  action: 'upload' | 'view' | 'download' | 'transfer' | 'modify' | 'delete';
  userId: string;
  timestamp: Date;
  notes?: string;
  hash: string;
  previousHash: string;
}

export interface AnalysisResult {
  id: string;
  evidenceId: string;
  type: 'footwear' | 'scene' | 'message';
  createdAt: Date;
  createdBy: string;
  results: Record<string, any>;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}