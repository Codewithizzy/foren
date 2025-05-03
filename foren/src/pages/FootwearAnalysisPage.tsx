import React from 'react';
import FootwearDatabase from '../components/FootwearDatabase';
import FootwearUpload from '../components/FootwearUpload';

const FootwearAnalysisPage: React.FC = () => {
  return (
    <div>
      <h2>Footwear Analysis</h2>
      <FootwearUpload />
      <FootwearDatabase />
    </div>
  );
};

export default FootwearAnalysisPage;
