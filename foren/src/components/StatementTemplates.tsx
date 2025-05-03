import React from 'react';

const StatementTemplates: React.FC = () => {
  const templates = [
    'Template 1: Basic Case Overview',
    'Template 2: Suspect Interrogation Summary',
    'Template 3: Evidence Analysis Report'
  ];

  return (
    <div>
      <h3>Statement Templates</h3>
      <ul>
        {templates.map((template, index) => (
          <li key={index}>{template}</li>
        ))}
      </ul>
    </div>
  );
};

export default StatementTemplates;
