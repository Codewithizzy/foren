// src/types/evidence.types.ts
export interface ChainOfCustodyEntry {
  timestamp: string;
  action: string;
  handledBy: string;
  notes?: string;
}

export interface EvidenceItem {
  id: string;
  type: string;
  relatedTo: string;
  collectedBy: string;
  createdAt: string;
  lastUpdated?: string;
  chainOfCustody: ChainOfCustodyEntry[];
}