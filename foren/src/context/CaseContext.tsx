import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CaseItem } from '../types/cases.types';
import { EvidenceItem } from '../types/evidence.types';

// Define a User type for case assignment
interface User {
  id: string;
  name: string;
}

interface CaseContextProps {
  cases: CaseItem[];
  evidence: EvidenceItem[];
  updateCase: (updatedCase: CaseItem) => void;
  addCase: (newCase: CaseItem) => void;
  getUsers: () => User[];
  getEvidenceForCase: (caseId: string) => EvidenceItem[];
  updateEvidence: (updatedEvidence: EvidenceItem) => void;
  addEvidence: (newEvidence: EvidenceItem) => void;
}

const CaseContext = createContext<CaseContextProps | undefined>(undefined);

// Helper functions for localStorage
const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

const saveToLocalStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const CaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or with default values
  const [cases, setCases] = useState<CaseItem[]>(() => 
    loadFromLocalStorage('cases', [
      {
        id: 'C-101',
        title: 'Burglary in Zone 7',
        status: 'Open',
        assignedTo: 'Detective Mark',
        createdAt: new Date().toISOString(),
        history: [],
        evidence: ['E-501'],
        notes: '',
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'C-102',
        title: 'Hit and Run – Main Street',
        status: 'Closed',
        assignedTo: 'Detective Rose',
        createdAt: new Date().toISOString(),
        history: [],
        evidence: ['E-502'],
        notes: '',
        lastUpdated: new Date().toISOString(),
      },
    ])
  );

  const [evidence, setEvidence] = useState<EvidenceItem[]>(() => 
    loadFromLocalStorage('evidence', [
      {
        id: 'E-501',
        type: 'CCTV Footage',
        relatedTo: 'C-101',
        collectedBy: 'Officer Lee',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'E-502',
        type: 'Fingerprint',
        relatedTo: 'C-102',
        collectedBy: 'Officer Maya',
        createdAt: new Date().toISOString(),
      },
    ])
  );

  const users: User[] = [
    { id: '1', name: 'Detective Mark' },
    { id: '2', name: 'Detective Rose' },
    { id: '3', name: 'Detective Jane' },
    { id: '4', name: 'Detective John' },
  ];

  // Save to localStorage whenever cases or evidence change
  useEffect(() => {
    saveToLocalStorage('cases', cases);
  }, [cases]);

  useEffect(() => {
    saveToLocalStorage('evidence', evidence);
  }, [evidence]);

  const updateCase = (updatedCase: CaseItem) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === updatedCase.id) {
          return {
            ...updatedCase,
            lastUpdated: new Date().toISOString(),
          };
        }
        return c;
      })
    );
  };

  const addCase = (newCase: CaseItem) => {
    setCases((prev) => [
      ...prev,
      {
        ...newCase,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      },
    ]);
  };

  const updateEvidence = (updatedEvidence: EvidenceItem) => {
    setEvidence((prev) =>
      prev.map((e) => (e.id === updatedEvidence.id ? updatedEvidence : e))
    );

    setCases((prev) =>
      prev.map((c) => {
        let updatedEvidenceList = c.evidence.filter((id) => id !== updatedEvidence.id);
        if (c.id === updatedEvidence.relatedTo) {
          updatedEvidenceList = Array.from(new Set([...updatedEvidenceList, updatedEvidence.id]));
        }
        return { 
          ...c, 
          evidence: updatedEvidenceList,
          lastUpdated: new Date().toISOString(),
        };
      })
    );
  };

  const addEvidence = (newEvidence: EvidenceItem) => {
    setEvidence((prev) => [
      ...prev,
      {
        ...newEvidence,
        createdAt: new Date().toISOString(),
      },
    ]);

    // Also update the related case's evidence array
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === newEvidence.relatedTo) {
          const updatedEvidenceList = Array.from(new Set([...c.evidence, newEvidence.id]));
          return { 
            ...c, 
            evidence: updatedEvidenceList,
            lastUpdated: new Date().toISOString(),
          };
        }
        return c;
      })
    );
  };

  const getUsers = () => users;

  const getEvidenceForCase = (caseId: string) => {
    return evidence.filter((e) => e.relatedTo === caseId);
  };

  return (
    <CaseContext.Provider
      value={{
        cases,
        evidence,
        updateCase,
        addCase,
        getUsers,
        updateEvidence,
        addEvidence,
        getEvidenceForCase,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCaseContext = () => {
  const context = useContext(CaseContext);
  if (!context) throw new Error('useCaseContext must be used within a CaseProvider');
  return context;
};