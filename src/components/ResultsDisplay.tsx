import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Target, 
  Layers, 
  ArrowRight, 
  Play,
  Code,
  Brain,
  TrendingUp,
  Copy,
  Download
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ProcessedQuery, FunctionCall } from '../types';

interface ResultsDisplayProps {
  result: ProcessedQuery;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'functions' | 'execution' | 'code'>('overview');

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'complex': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const generateExecutionCode = (calls: FunctionCall[]) => {
    let code = '// Generated execution code\n';
    code += 'async function executeQuery() {\n';
    code += '  try {\n';
    
    calls.forEach((call, index) => {
      const params = Object.entries(call.parameters)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(', ');
      
      code += `    // Step ${index + 1}: ${call.description}\n`;
      code += `    const result${index + 1} = await ${call.function}({ ${params} });\n`;
      if (index < calls.length - 1) {
        code += `    console.log('Step ${index + 1} completed:', result${index + 1});\n\n`;
      }
    });
    
    code += '    \n    return {\n';
    calls.forEach((call, index) => {
      code += `      step${index + 1}: result${index + 1}${index < calls.length - 1 ? ',' : ''}\n`;
    });
    code += '    };\n';
    code += '  } catch (error) {\n';
    code += '    console.error("Execution failed:", error);\n';
    code += '    throw error;\n';
    code += '  }\n';
    code += '}\n\n';
    code += '// Execute the pipeline\n';
    code += 'executeQuery().then(results => {\n';
    code += '  console.log("Pipeline completed successfully:", results);\n';
    code += '}).catch(error => {\n';
    code += '  console.error("Pipeline failed:", error);\n';
    code += '});';
    
    return code;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadCode = (code: string) => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'execution-pipeline.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Query Processing Results</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">AI Analysis Complete</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(result.complexity)}`}>
                {result.complexity.charAt(0).toUpperCase() + result.complexity.slice(1)} Query
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800 font-medium mb-2">Original Query:</p>
            <p className="text-gray-700 italic">"{result.query}"</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Target },
              { id: 'functions', label: 'Functions', icon: Layers },
              { id: 'execution', label: 'Execution Plan', icon: Play },
              { id: 'code', label: 'Generated Code', icon: Code }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Intent</span>
                  </div>
                  <p className="text-sm text-blue-800">{result.intent}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Layers className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Functions</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800">{result.functionCalls.length}</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Est. Time</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">{result.estimatedTime}s</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Confidence</span>
                  </div>
                  <p className={`text-2xl font-bold ${getConfidenceColor(result.confidence)}`}>
                    {Math.round(result.confidence * 100)}%
                  </p>
                </div>
              </div>

              {/* Execution Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Execution Summary</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Query successfully parsed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Functions identified and validated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Execution plan generated</span>
                  </div>
                </div>
                <p className="text-gray-700">
                  The AI model has successfully analyzed your query and identified {result.functionCalls.length} functions
                  that need to be executed in sequence to fulfill your request. The execution plan includes proper
                  dependency management and parameter mapping between functions.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'functions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Selected Functions</h3>
                <span className="text-sm text-gray-600">{result.functionCalls.length} functions identified</span>
              </div>
              
              {result.functionCalls.map((call, index) => (
                <motion.div
                  key={call.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{call.executionOrder}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{call.function}</h4>
                        <p className="text-sm text-gray-600">{call.description}</p>
                      </div>
                    </div>
                    {call.dependencies && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Depends on:</span>
                        <span className="bg-gray-200 px-2 py-1 rounded">{call.dependencies.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-900 mb-2">Parameters:</h5>
                    <div className="space-y-1">
                      {Object.entries(call.parameters).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2 text-sm">
                          <span className="font-medium text-gray-700">{key}:</span>
                          <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'execution' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Execution Plan</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Estimated completion: {result.estimatedTime} seconds</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {result.executionPlan}
                </pre>
              </div>
              
              {/* Visual Flow */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Visual Flow</h4>
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  {result.functionCalls.map((call, index) => (
                    <React.Fragment key={call.id}>
                      <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg text-center min-w-[120px]">
                        <div className="text-sm font-semibold text-blue-900">{call.function}</div>
                        <div className="text-xs text-blue-700 mt-1">Step {call.executionOrder}</div>
                      </div>
                      {index < result.functionCalls.length - 1 && (
                        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Generated Execution Code</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(generateExecutionCode(result.functionCalls))}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </button>
                  <button
                    onClick={() => downloadCode(generateExecutionCode(result.functionCalls))}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                >
                  {generateExecutionCode(result.functionCalls)}
                </SyntaxHighlighter>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-2">Implementation Notes</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• This code is generated based on the AI's analysis of your query</li>
                  <li>• Each function call includes the identified parameters and proper error handling</li>
                  <li>• The execution order ensures dependencies are resolved correctly</li>
                  <li>• You can modify the parameters and add custom logic as needed</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};