// src/utils/statementTemplates.ts
export interface StatementTemplate {
  id: string;
  name: string;
  description: string;
  fields: string[];
}

export const statementTemplates: StatementTemplate[] = [
  { 
    id: 'T-1', 
    name: 'Standard Arrest Statement',
    description: 'Template for standard arrest procedures',
    fields: ['suspectDescription', 'arrestLocation', 'charges']
  },
  { 
    id: 'T-2', 
    name: 'Incident Report Statement',
    description: 'Template for incident reports',
    fields: ['incidentType', 'location', 'time', 'witnesses']
  },
  { 
    id: 'T-3', 
    name: 'Court Evidence Statement',
    description: 'Template for evidence presentation',
    fields: ['evidenceItems', 'collectionDate', 'chainOfCustody']
  },
];

export const generateAIStatement = (templateId: string, caseId: string): string => {
  const template = statementTemplates.find(t => t.id === templateId);
  if (!template) return `Statement for case ${caseId}`;
  
  switch (templateId) {
    case 'T-1':
      return `Arrest Statement for case ${caseId}:\n\nOn [DATE], at approximately [TIME], officers apprehended [SUSPECT] at [LOCATION] in connection with [CHARGES]. The arrest was conducted without incident and all proper procedures were followed.`;
    case 'T-2':
      return `Incident Report for case ${caseId}:\n\nType: [INCIDENT TYPE]\nLocation: [LOCATION]\nTime: [TIME]\n\nDescription: [DETAILED DESCRIPTION]\n\nWitnesses: [WITNESS NAMES]\n\nActions Taken: [RESPONSE DETAILS]`;
    case 'T-3':
      return `Evidence Statement for case ${caseId}:\n\n1. Evidence Items:\n   - [ITEM 1]\n   - [ITEM 2]\n\n2. Collection Details:\n   Date: [DATE]\n   Collected By: [OFFICER]\n\n3. Chain of Custody:\n   [CUSTODY DETAILS]`;
    default:
      return `Official Statement for case ${caseId}:\n\n[DETAILED STATEMENT CONTENT]`;
  }
};