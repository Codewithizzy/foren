import React, { useState } from 'react';
import { ArrowRight, Upload, Footprints, Database, AlertTriangle, FileText, Shield, Link as LinkIcon } from 'lucide-react';

interface MatchResult {
  id: number;
  brand: string;
  model: string;
  confidence: number;
  image: string;
  characteristics: string[];
  metadata?: {
    sizeEstimate: string;
    patternType: string;
    wearPattern: string;
    direction: string;
  };
}

interface AnalysisReport {
  timestamp: string;
  imageHash: string;
  matches: MatchResult[];
  blockchainTx?: string;
}

const FootwearAnalysis: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResult[] | null>(null);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isSendingToBlockchain, setIsSendingToBlockchain] = useState(false);
  const [blockchainSuccess, setBlockchainSuccess] = useState(false);
  const [analysisNotes, setAnalysisNotes] = useState('');

  // Mock footwear database matches with enhanced metadata
  const mockMatches: MatchResult[] = [
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
      ],
      metadata: {
        sizeEstimate: '10.5 US',
        patternType: 'Athletic shoe',
        wearPattern: 'Normal gait',
        direction: 'Right to left'
      }
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
      ],
      metadata: {
        sizeEstimate: '10 US',
        patternType: 'Athletic shoe',
        wearPattern: 'Slight supination',
        direction: 'Right to left'
      }
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
      ],
      metadata: {
        sizeEstimate: '10-11 US',
        patternType: 'Running shoe',
        wearPattern: 'Neutral',
        direction: 'Right to left'
      }
    }
  ];

  // Simulate AI analysis
  const analyzeImage = async (file: File): Promise<MatchResult[]> => {
    // call an actual AI service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMatches);
      }, 2000);
    });
  };

  // Simulate blockchain transaction
  const sendToBlockchain = async (report: AnalysisReport): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        resolve(txHash);
      }, 3000);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
      setAnalysisComplete(false);
      setMatchResults(null);
      setReport(null);
      setBlockchainSuccess(false);
    }
  };

  const handleRunAnalysis = async () => {
    if (!imageFile) return;
    
    setActiveStep(2);
    setAnalysisComplete(false);
    
    try {
      const results = await analyzeImage(imageFile);
      setMatchResults(results);
      setAnalysisComplete(true);
      
      // Generate report
      const newReport: AnalysisReport = {
        timestamp: new Date().toISOString(),
        imageHash: `sha256-${Math.random().toString(36).substring(2, 15)}`,
        matches: results
      };
      setReport(newReport);
      
      setActiveStep(3);
    } catch (error) {
      console.error('Analysis failed:', error);
      setActiveStep(1);
    }
  };

  const handleSendToBlockchain = async () => {
    if (!report) return;
    
    setIsSendingToBlockchain(true);
    try {
      const txHash = await sendToBlockchain(report);
      setReport({
        ...report,
        blockchainTx: txHash
      });
      setBlockchainSuccess(true);
    } catch (error) {
      console.error('Blockchain submission failed:', error);
    } finally {
      setIsSendingToBlockchain(false);
    }
  };

  const generateReport = () => {
    if (!report || !matchResults) return '';
    
    let reportText = `FOOTWEAR ANALYSIS REPORT\n`;
    reportText += `Generated: ${new Date(report.timestamp).toLocaleString()}\n`;
    reportText += `Image Hash: ${report.imageHash}\n`;
    reportText += `Blockchain TX: ${report.blockchainTx || 'Not submitted'}\n\n`;
    
    reportText += `ANALYSIS SUMMARY\n`;
    const topMatch = matchResults[0];
    reportText += `Top Match: ${topMatch.brand} ${topMatch.model} (${Math.round(topMatch.confidence * 100)}%)\n`;
    reportText += `Estimated Size: ${topMatch.metadata?.sizeEstimate || 'Unknown'}\n`;
    reportText += `Pattern Type: ${topMatch.metadata?.patternType || 'Unknown'}\n\n`;
    
    reportText += `MATCH DETAILS\n`;
    matchResults.forEach((match, index) => {
      reportText += `\nMatch #${index + 1}: ${match.brand} ${match.model}\n`;
      reportText += `Confidence: ${Math.round(match.confidence * 100)}%\n`;
      match.characteristics.forEach(char => {
        reportText += `• ${char}\n`;
      });
    });
    
    reportText += `\nANALYST NOTES\n${analysisNotes || 'No notes provided'}`;
    
    return reportText;
  };

  const downloadReport = () => {
    const reportContent = generateReport();
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `footwear-analysis-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                  Upload a clear image of a footwear impression to analyze and match against our database of over 25,000 shoe patterns.
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
                        onClick={() => {
                          setSelectedImage(null);
                          setImageFile(null);
                        }}
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

              <div>
                <h3 className="text-white font-medium mb-3">Or use a sample image:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    'https://images.pexels.com/photos/6059631/pexels-photo-6059631.jpeg?auto=compress&cs=tinysrgb&w=800',
                    'https://images.pexels.com/photos/11437012/pexels-photo-11437012.jpeg?auto=compress&cs=tinysrgb&w=800',
                    'https://images.pexels.com/photos/2682021/pexels-photo-2682021.jpeg?auto=compress&cs=tinysrgb&w=800'
                  ].map((imgUrl, index) => (
                    <div 
                      key={index}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setSelectedImage(imgUrl);
                        // Create a mock file object for sample images
                        const mockFile = new File([], `sample-${index + 1}.jpg`, { type: 'image/jpeg' });
                        setImageFile(mockFile);
                      }}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Sample footprint ${index + 1}`} 
                        className="rounded-md h-32 w-full object-cover"
                      />
                    </div>
                  ))}
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
                Our AI is analyzing the footwear impression using advanced pattern recognition algorithms and matching it against our extensive database.
              </p>
              <div className="mt-6 w-full max-w-md bg-gray-750 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: analysisComplete ? '100%' : '70%' }}
                ></div>
              </div>
            </div>
          )}

          {activeStep === 3 && matchResults && report && (
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
                          <li>• Pattern type: {matchResults[0].metadata?.patternType || 'Unknown'}</li>
                          <li>• Estimated size: {matchResults[0].metadata?.sizeEstimate || 'Unknown'}</li>
                          <li>• Wear pattern: {matchResults[0].metadata?.wearPattern || 'Unknown'}</li>
                          <li>• Direction: {matchResults[0].metadata?.direction || 'Unknown'}</li>
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
              
              <div className="bg-gray-750 border border-gray-700 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Analysis Notes</h3>
                <textarea
                  value={analysisNotes}
                  onChange={(e) => setAnalysisNotes(e.target.value)}
                  placeholder="Add your analysis notes here..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-gray-300 text-sm h-32 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
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
              
              <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm"
                  >
                    Analyze Another
                  </button>
                  <button
                    onClick={downloadReport}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export Report
                  </button>
                </div>
                
                <div className="flex space-x-3">
                  {!report.blockchainTx ? (
                    <button
                      onClick={handleSendToBlockchain}
                      disabled={isSendingToBlockchain}
                      className={`px-4 py-2 rounded-md text-white text-sm flex items-center ${
                        isSendingToBlockchain 
                          ? 'bg-blue-800 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isSendingToBlockchain ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Secure to Blockchain
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center px-4 py-2 bg-green-900/30 border border-green-800 rounded-md text-green-400 text-sm">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      <span>Blockchain Verified</span>
                    </div>
                  )}
                </div>
              </div>
              
              {report.blockchainTx && (
                <div className="bg-gray-750 p-3 rounded-md border border-gray-700">
                  <h4 className="text-white text-sm font-medium mb-1">Blockchain Transaction</h4>
                  <p className="text-gray-400 text-xs font-mono break-all">
                    TX Hash: {report.blockchainTx}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FootwearAnalysis;