import React, { useState } from 'react';
import { ArrowRight, Upload, Footprints, Database, AlertTriangle } from 'lucide-react';

const FootwearAnalysis: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [matchResults, setMatchResults] = useState<any[] | null>(null);

  // Mock footwear database matches
  const mockMatches = [
    {
      id: 1,
      brand: 'Nike',
      model: 'Air Max 90',
      confidence: 0.92,
      image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      characteristics: [
        'Distinctive heel pattern',
        'Side swoosh impression',
        'Size estimated: 10.5 US',
        'Wear pattern indicates normal gait'
      ]
    },
    {
      id: 2,
      brand: 'Nike',
      model: 'Air Force 1',
      confidence: 0.78,
      image: 'https://images.pexels.com/photos/9002742/pexels-photo-9002742.jpeg?auto=compress&cs=tinysrgb&w=800',
      characteristics: [
        'Similar tread pattern',
        'Different heel curvature',
        'Size estimated: 10 US',
        'Some pattern similarities in forefoot'
      ]
    },
    {
      id: 3,
      brand: 'Adidas',
      model: 'Ultraboost',
      confidence: 0.64,
      image: 'https://images.pexels.com/photos/6050398/pexels-photo-6050398.jpeg?auto=compress&cs=tinysrgb&w=800',
      characteristics: [
        'Partial match on outsole pattern',
        'Different brand characteristic',
        'Size estimated: 10-11 US',
        'Low confidence match'
      ]
    }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For demo purposes, we'll use a local URL
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleRunAnalysis = () => {
    // Simulate analysis processing
    setActiveStep(2);
    
    setTimeout(() => {
      setAnalysisComplete(true);
      setMatchResults(mockMatches);
      setActiveStep(3);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Footprints className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold text-white">Footwear Analysis</h1>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <div className="bg-gray-850 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-white">Analysis Workflow</h2>
            <div className="text-sm text-gray-400">
              Step {activeStep} of 3
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <div className="flex items-center">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  1
                </div>
                <div className={`h-0.5 flex-1 mx-2 ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  2
                </div>
                <div className={`h-0.5 flex-1 mx-2 ${activeStep >= 3 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activeStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  3
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <div className={activeStep >= 1 ? 'text-blue-400' : 'text-gray-500'}>Upload</div>
                <div className={activeStep >= 2 ? 'text-blue-400' : 'text-gray-500'}>Analysis</div>
                <div className={activeStep >= 3 ? 'text-blue-400' : 'text-gray-500'}>Results</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeStep === 1 && (
            <div className="space-y-6">
              <div className="bg-gray-750 border border-gray-700 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Upload Footwear Evidence</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Upload a clear image of a footwear impression to analyze and match against the database.
                </p>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 bg-gray-800">
                  {selectedImage ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={selectedImage} 
                        alt="Uploaded footwear" 
                        className="max-h-64 object-contain mb-4 rounded-md" 
                      />
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-500 mb-3" />
                      <p className="text-gray-400 mb-2">Drag and drop or click to upload</p>
                      <p className="text-gray-500 text-sm mb-4">Supports JPG, PNG - Max 10MB</p>
                      <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm cursor-pointer">
                        Browse Files
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* For demo purposes, let's provide some sample images */}
              <div>
                <h3 className="text-white font-medium mb-3">Or use a sample image:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div 
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage('https://images.pexels.com/photos/6059631/pexels-photo-6059631.jpeg?auto=compress&cs=tinysrgb&w=800')}
                  >
                    <img 
                      src="https://images.pexels.com/photos/6059631/pexels-photo-6059631.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="Sample footprint 1" 
                      className="rounded-md h-32 w-full object-cover"
                    />
                  </div>
                  <div 
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage('https://images.pexels.com/photos/11437012/pexels-photo-11437012.jpeg?auto=compress&cs=tinysrgb&w=800')}
                  >
                    <img 
                      src="https://images.pexels.com/photos/11437012/pexels-photo-11437012.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="Sample footprint 2" 
                      className="rounded-md h-32 w-full object-cover"
                    />
                  </div>
                  <div 
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage('https://images.pexels.com/photos/2682021/pexels-photo-2682021.jpeg?auto=compress&cs=tinysrgb&w=800')}
                  >
                    <img 
                      src="https://images.pexels.com/photos/2682021/pexels-photo-2682021.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="Sample footprint 3" 
                      className="rounded-md h-32 w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleRunAnalysis}
                  disabled={!selectedImage}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    selectedImage 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Run Analysis
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-6"></div>
              <h3 className="text-xl font-medium text-white mb-3">Analyzing Footwear Evidence</h3>
              <p className="text-gray-400 text-center max-w-md">
                Our AI is analyzing the footwear impression and matching it against our database of over 10,000 shoe patterns.
              </p>
            </div>
          )}

          {activeStep === 3 && matchResults && (
            <div className="space-y-6">
              <div className="bg-gray-750 border border-gray-700 rounded-lg p-4">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                    <h3 className="text-white font-medium mb-2">Your Evidence</h3>
                    <div className="bg-gray-800 p-2 rounded-md border border-gray-700">
                      <img 
                        src={selectedImage!} 
                        alt="Uploaded footwear" 
                        className="w-full rounded-md" 
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="bg-blue-900/30 p-3 rounded-md border border-blue-900">
                        <h4 className="text-blue-400 font-medium text-sm mb-1">Analysis Results</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Pattern type: Athletic shoe</li>
                          <li>• Estimated size: 10-11 US</li>
                          <li>• Distinctive heel wear pattern</li>
                          <li>• Direction: Right to left</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="flex items-center mb-3">
                      <Database className="h-5 w-5 text-blue-500 mr-2" />
                      <h3 className="text-white font-medium">Database Matches</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {matchResults.map((match) => (
                        <div 
                          key={match.id} 
                          className={`bg-gray-800 p-4 rounded-md border ${
                            match.confidence > 0.9 
                              ? 'border-green-600' 
                              : match.confidence > 0.7 
                                ? 'border-yellow-600' 
                                : 'border-gray-700'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 mb-3 sm:mb-0 sm:mr-4">
                              <img 
                                src={match.image} 
                                alt={`${match.brand} ${match.model}`} 
                                className="w-full h-32 object-cover rounded-md" 
                              />
                            </div>
                            <div className="sm:w-3/4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-medium">{match.brand} {match.model}</h4>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  match.confidence > 0.9 
                                    ? 'bg-green-900/50 text-green-400' 
                                    : match.confidence > 0.7 
                                      ? 'bg-yellow-900/50 text-yellow-400' 
                                      : 'bg-gray-700 text-gray-400'
                                }`}>
                                  {Math.round(match.confidence * 100)}% Match
                                </div>
                              </div>
                              <ul className="text-sm text-gray-300 space-y-1 mb-3">
                                {match.characteristics.map((char: string, idx: number) => (
                                  <li key={idx}>• {char}</li>
                                ))}
                              </ul>
                              <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">
                                  View Details
                                </button>
                                <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm">
                                  Compare
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-900/30 p-4 rounded-md border border-yellow-800 flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-yellow-400 font-medium mb-1">Important Notice</h4>
                  <p className="text-gray-300 text-sm">
                    This analysis provides potential matches based on digital comparison. Results should be verified by a qualified forensic expert before use in an investigation or court proceedings.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm"
                >
                  Analyze Another
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
                >
                  Export Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FootwearAnalysis;