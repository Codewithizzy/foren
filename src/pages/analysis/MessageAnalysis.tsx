import React, { useState } from 'react';
import { MessageSquare, AlertTriangle, Smile, Frown, Meh, ThumbsUp, ThumbsDown, ArrowRight, User, Bot } from 'lucide-react';

interface MessageData {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
}

interface AnalysisResult {
  sentiment: {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
  };
  deception: {
    score: number;
    indicators: string[];
  };
  keywords: string[];
  threats: {
    detected: boolean;
    phrases: string[];
    severity: 'low' | 'medium' | 'high';
  };
  summary: string;
}

const MessageAnalysis: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Sample messages for demonstration
  const sampleMessages = [
    {
      title: 'Threatening Email',
      content: "I know what you did last summer. If you don't transfer $5000 to the account I provided, I will share the evidence with everyone. You have 48 hours to comply. Don't try to contact authorities or you'll regret it.",
    },
    {
      title: 'Suspicious SMS',
      content: "Hey, I need you to do me a favor. Can you send me the security codes for the lab? I forgot mine at home and need to get in ASAP. Don't tell anyone I asked.",
    },
    {
      title: 'Witness Statement',
      content: "I was at home all night. I didn't go anywhere near the crime scene. I don't know anything about what happened, and I've never even met the victim before. You can check my phone records if you want.",
    }
  ];
  
  const loadSampleMessage = (content: string) => {
    const newMessages = [
      {
        id: Date.now(),
        content,
        sender: 'Subject',
        timestamp: new Date().toISOString()
      }
    ];
    setMessages(newMessages);
  };
  
  const addMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        content: inputMessage,
        sender: 'Subject',
        timestamp: new Date().toISOString()
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };
  
  const clearMessages = () => {
    setMessages([]);
    setAnalysisResult(null);
  };
  
  const runAnalysis = () => {
    if (messages.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Mock analysis results - in a real app, this would come from an API
      const isThreatening = messages.some(m => 
        m.content.toLowerCase().includes('threat') || 
        m.content.toLowerCase().includes('evidence') ||
        m.content.toLowerCase().includes('regret')
      );
      
      const isDeceptive = messages.some(m =>
        m.content.toLowerCase().includes('didn\'t') &&
        m.content.toLowerCase().includes('never')
      );
      
      const mockResult: AnalysisResult = {
        sentiment: {
          score: isThreatening ? -0.78 : (isDeceptive ? -0.42 : 0.15),
          label: isThreatening ? 'negative' : (isDeceptive ? 'negative' : 'neutral')
        },
        deception: {
          score: isDeceptive ? 0.76 : (isThreatening ? 0.45 : 0.22),
          indicators: isDeceptive ? 
            ['Excessive denial', 'Unnecessary details', 'Lack of contractions'] : 
            (isThreatening ? ['Vague references', 'Urgency indicators'] : [])
        },
        keywords: isThreatening ? 
          ['evidence', 'transfer', 'regret', 'authorities'] :
          (isDeceptive ? ['never', 'didn\'t', 'anything', 'check'] : ['favor', 'need', 'security', 'codes']),
        threats: {
          detected: isThreatening,
          phrases: isThreatening ? 
            ['you\'ll regret it', 'I will share the evidence'] : [],
          severity: isThreatening ? 'high' : 'low'
        },
        summary: isThreatening ? 
          'The message contains explicit threats and blackmail attempts, demanding money in exchange for withholding unspecified evidence. The sender is using intimidation and urgency to pressure the recipient.' :
          (isDeceptive ? 
            'The message shows multiple indicators of potential deception, including excessive denial, unnecessary details, and distancing language. The statement appears rehearsed rather than natural.' :
            'The message requests access to secure systems through irregular channels, suggesting potential social engineering attempt. The sender is creating urgency and requesting secrecy.')
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getSentimentIcon = (sentiment: AnalysisResult['sentiment']) => {
    if (sentiment.label === 'positive') return <Smile className="h-5 w-5 text-green-500" />;
    if (sentiment.label === 'negative') return <Frown className="h-5 w-5 text-red-500" />;
    return <Meh className="h-5 w-5 text-yellow-500" />;
  };
  
  const getDeceptionLevel = (score: number) => {
    if (score > 0.7) return { label: 'High', color: 'text-red-500' };
    if (score > 0.4) return { label: 'Medium', color: 'text-yellow-500' };
    return { label: 'Low', color: 'text-green-500' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <MessageSquare className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold text-white">Message Analysis</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-850 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
              <h2 className="font-medium text-white">Message Content</h2>
              <div className="flex space-x-2">
                <button
                  onClick={clearMessages}
                  disabled={messages.length === 0}
                  className={`text-xs px-2 py-1 rounded ${
                    messages.length > 0 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Clear
                </button>
                <button
                  onClick={runAnalysis}
                  disabled={messages.length === 0 || isAnalyzing}
                  className={`text-xs px-2 py-1 rounded ${
                    messages.length > 0 && !isAnalyzing
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            </div>
            
            <div className="p-4 h-96 flex flex-col">
              {messages.length > 0 ? (
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 flex-shrink-0">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="bg-gray-750 rounded-lg p-3 max-w-3xl">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-300">{message.sender}</span>
                          <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
                        </div>
                        <p className="text-white">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <MessageSquare className="h-12 w-12 text-gray-600" />
                  <p>No messages to analyze</p>
                  <p className="text-sm text-center max-w-md">
                    Enter a message below or use one of our sample messages to get started.
                  </p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Enter message to analyze..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={addMessage}
                  disabled={!inputMessage.trim()}
                  className={`px-4 flex items-center ${
                    inputMessage.trim() 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  } rounded-md`}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-850 px-4 py-3 border-b border-gray-700">
              <h2 className="font-medium text-white">Sample Messages</h2>
            </div>
            <div className="p-4 grid grid-cols-1 gap-3">
              {sampleMessages.map((sample, index) => (
                <div key={index} className="bg-gray-750 p-3 rounded-md border border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-white">{sample.title}</h3>
                    <button
                      onClick={() => loadSampleMessage(sample.content)}
                      className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                    >
                      Load
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">{sample.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-850 px-4 py-3 border-b border-gray-700">
              <h2 className="font-medium text-white">Analysis Results</h2>
            </div>
            
            {isAnalyzing ? (
              <div className="p-6 flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-300">Analyzing messages...</p>
              </div>
            ) : analysisResult ? (
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Sentiment Analysis</h3>
                  <div className="flex items-center bg-gray-750 p-3 rounded-md border border-gray-700">
                    {getSentimentIcon(analysisResult.sentiment)}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-white capitalize">
                        {analysisResult.sentiment.label}
                      </div>
                      <div className="mt-1 w-full bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            analysisResult.sentiment.label === 'positive' ? 'bg-green-500' :
                            analysisResult.sentiment.label === 'negative' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`} 
                          style={{ 
                            width: `${Math.abs(analysisResult.sentiment.score) * 100}%`,
                            marginLeft: analysisResult.sentiment.score < 0 ? 'auto' : 0,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Deception Indicators</h3>
                  <div className="bg-gray-750 p-3 rounded-md border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white">Deception Probability</span>
                      <span className={`text-sm font-medium ${getDeceptionLevel(analysisResult.deception.score).color}`}>
                        {getDeceptionLevel(analysisResult.deception.score).label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
                      <div 
                        className="bg-red-500 h-1.5 rounded-full" 
                        style={{ width: `${analysisResult.deception.score * 100}%` }}
                      ></div>
                    </div>
                    
                    {analysisResult.deception.indicators.length > 0 ? (
                      <div className="mt-2">
                        <span className="text-xs text-gray-400">Potential indicators:</span>
                        <ul className="mt-1 space-y-1">
                          {analysisResult.deception.indicators.map((indicator, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start">
                              <span className="text-red-500 mr-1">•</span> {indicator}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-green-400">No significant deception indicators detected</p>
                    )}
                  </div>
                </div>
                
                {analysisResult.threats.detected && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Threat Assessment</h3>
                    <div className="bg-red-900/30 p-3 rounded-md border border-red-900">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-sm font-medium text-white">
                          Threat Detected - {analysisResult.threats.severity.toUpperCase()} Severity
                        </span>
                      </div>
                      
                      {analysisResult.threats.phrases.length > 0 && (
                        <div>
                          <span className="text-xs text-gray-300">Threatening phrases:</span>
                          <ul className="mt-1 space-y-1">
                            {analysisResult.threats.phrases.map((phrase, idx) => (
                              <li key={idx} className="text-sm text-red-300 italic flex items-start">
                                <span className="text-red-500 mr-1">•</span> "{phrase}"
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Key Phrases</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywords.map((keyword, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-750 border border-gray-700 rounded-full text-sm text-gray-300">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">AI Summary</h3>
                  <div className="bg-gray-750 p-3 rounded-md border border-gray-700">
                    <div className="flex items-start mb-2">
                      <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-2 flex-shrink-0">
                        <Bot className="h-3 w-3 text-blue-400" />
                      </div>
                      <p className="text-sm text-gray-300">{analysisResult.summary}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
                    Export Report
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center h-64 text-gray-400">
                <ThumbsUp className="h-12 w-12 text-gray-600 mb-3" />
                <p className="mb-1">No analysis results yet</p>
                <p className="text-sm text-center">
                  Enter messages and click "Analyze" to process them
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-blue-900/20 p-4 rounded-md border border-blue-800">
            <h3 className="text-blue-400 font-medium mb-2 text-sm">About Message Analysis</h3>
            <p className="text-sm text-gray-300 mb-3">
              This tool uses NLP and machine learning to analyze text messages, emails, social media posts, and other communications for:
            </p>
            <ul className="text-sm text-gray-300 space-y-1 mb-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-1">•</span> Sentiment and emotional tone
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-1">•</span> Potential deception indicators
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-1">•</span> Threats or concerning content
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-1">•</span> Key phrases and linguistic patterns
              </li>
            </ul>
            <p className="text-xs text-gray-400">
              Note: This analysis is intended as an investigative aid only and should be evaluated by trained professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageAnalysis;