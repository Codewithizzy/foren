import React from 'react';
import StatementGenerator from '../components/StatementGenerator';
import StatementTemplates from '../components/StatementTemplates';

const CourtStatementsPage: React.FC = () => {
  return (
    <div>
      <h2>Court Statements</h2>
      <StatementGenerator />
      <StatementTemplates />
    </div>
  );
};

export default CourtStatementsPage;
