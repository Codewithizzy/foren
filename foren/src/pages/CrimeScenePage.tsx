import React from 'react';
import SceneReconstruction from '../components/SceneReconstruction';
import SceneUpload from '../components/SceneUpload';
import BloodstainAnalysis from '../components/BloodstainAnalysis';

const CrimeScenePage: React.FC = () => {
  return (
    <div>
      <h2>Crime Scene</h2>
      <SceneUpload />
      <SceneReconstruction />
      <BloodstainAnalysis />
    </div>
  );
};

export default CrimeScenePage;
