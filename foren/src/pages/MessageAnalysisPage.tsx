import React from 'react';
import DeepfakeDetection from '../components/DeepfakeDetection';
import LinguisticAnalysis from '../components/LinguisticAnalysis';
import MessageUpload from '../components/MessageUpload';

const MessageAnalysisPage: React.FC = () => {
  return (
    <div>
      <h2>Message Analysis</h2>
      <MessageUpload />
      <LinguisticAnalysis />
      <DeepfakeDetection />
    </div>
  );
};

export default MessageAnalysisPage;
