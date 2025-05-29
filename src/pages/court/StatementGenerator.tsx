import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileText, Download, AlertTriangle } from 'lucide-react';

interface StatementForm {
  caseNumber: string;
  officerName: string;
  officerBadge: string;
  evidenceDescription: string;
  collectionDate: string;
  collectionLocation: string;
  chainOfCustody: string;
  analysisResults: string;
  expertOpinion: string;
  additionalNotes: string;
}

const StatementGenerator: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<StatementForm>();
  const [generatedStatement, setGeneratedStatement] = useState<string | null>(null);

  const onSubmit = (data: StatementForm) => {
    // In a real application, this would be processed through an API
    const statement = generateStatement(data);
    setGeneratedStatement(statement);
  };

  const generateStatement = (data: StatementForm): string => {
    const currentDate = new Date().toLocaleDateString();
    
    return `
OFFICIAL FORENSIC EVIDENCE STATEMENT
Date: ${currentDate}
Case Number: ${data.caseNumber}

DECLARATION

I, ${data.officerName} (Badge #${data.officerBadge}), being duly sworn, declare:

1. EVIDENCE DESCRIPTION
${data.evidenceDescription}

2. COLLECTION DETAILS
Date of Collection: ${data.collectionDate}
Location: ${data.collectionLocation}

3. CHAIN OF CUSTODY
${data.chainOfCustody}

4. ANALYSIS RESULTS
${data.analysisResults}

5. EXPERT OPINION
${data.expertOpinion}

6. ADDITIONAL NOTES
${data.additionalNotes}

I declare under penalty of perjury that the foregoing is true and correct to the best of my knowledge.

Signature: _______________________
Date: ${currentDate}
Badge Number: ${data.officerBadge}

This statement was generated using the Foren Forensic Science Platform, which maintains blockchain-verified records of all evidence handling and analysis procedures.
    `.trim();
  };

  const downloadStatement = () => {
    if (!generatedStatement) return;
    
    const blob = new Blob([generatedStatement], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forensic-statement-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <FileText className="h-6 w-6 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold text-white">Court Statement Generator</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-medium text-white mb-4">Statement Details</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Case Number
              </label>
              <input
                type="text"
                {...register("caseNumber", { required: true })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.caseNumber && (
                <p className="mt-1 text-sm text-red-500">Case number is required</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Officer Name
                </label>
                <input
                  type="text"
                  {...register("officerName", { required: true })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Badge Number
                </label>
                <input
                  type="text"
                  {...register("officerBadge", { required: true })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Evidence Description
              </label>
              <textarea
                {...register("evidenceDescription", { required: true })}
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Collection Date
                </label>
                <input
                  type="date"
                  {...register("collectionDate", { required: true })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Collection Location
                </label>
                <input
                  type="text"
                  {...register("collectionLocation", { required: true })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Chain of Custody Summary
              </label>
              <textarea
                {...register("chainOfCustody", { required: true })}
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Analysis Results
              </label>
              <textarea
                {...register("analysisResults", { required: true })}
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Expert Opinion
              </label>
              <textarea
                {...register("expertOpinion", { required: true })}
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Additional Notes
              </label>
              <textarea
                {...register("additionalNotes")}
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                Generate Statement
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Generated Statement</h2>
            {generatedStatement && (
              <button
                onClick={downloadStatement}
                className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
            )}
          </div>

          {generatedStatement ? (
            <div className="bg-gray-900 p-4 rounded-md font-mono text-sm text-gray-300 whitespace-pre-wrap">
              {generatedStatement}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-gray-400">
              <FileText className="h-12 w-12 mb-4" />
              <p>Fill out the form to generate a statement</p>
            </div>
          )}

          {generatedStatement && (
            <div className="mt-4 p-4 bg-yellow-900/30 rounded-md border border-yellow-800">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-yellow-500 font-medium">Important Notice</h4>
                  <p className="mt-1 text-sm text-gray-300">
                    This generated statement is a draft and should be reviewed by appropriate personnel before submission to court. Ensure all details are accurate and comply with local legal requirements.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatementGenerator;