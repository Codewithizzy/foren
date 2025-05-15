// src/types/statements.types.ts
export interface CourtStatement {
  id: string;
  caseId: string;
  generatedBy: string;
  date: string;
  content: string;
  templateUsed?: string;
  lastModified?: string;
}