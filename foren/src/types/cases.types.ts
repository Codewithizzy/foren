export interface AssignmentLog {
  assignedTo: string;
  changedAt: string; // ISO date string
}

export interface CaseNote {
  text: string;
  timestamp: string; // ISO date string
  author?: string;   // Optional field for future use
}

export interface CaseItem {
  id: string;
  title: string;
  status: 'Open' | 'Pending' | 'Closed'; // Added 'Pending' status
  assignedTo: string;
  createdAt: string; // ISO date string
  lastUpdated: string; // ISO date string
  history: AssignmentLog[];
  evidence: string[]; // Array of evidence IDs
  notes?: string; // Current notes (optional)
  noteHistory: CaseNote[]; // Array of note history entries
  activityLog: string[]; // Array of activity log messages
  statements?: string[];
}