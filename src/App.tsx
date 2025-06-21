import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Book, 
  PlayCircle, 
  Github, 
  ExternalLink,
  Cpu,
  Database,
  Network,
  Shield
} from 'lucide-react';
import { QueryInterface } from './components/QueryInterface';
import { ResultsDisplay } from './components/ResultsDisplay';
import { FunctionLibrary } from './components/FunctionLibrary';
import { ProcessedQuery } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'query' | 'library' | 'results'>('query');
  const [queryResult, setQueryResult] = useState<ProcessedQuery | null>(null);

  const handleQueryResult = (result: ProcessedQuery) => {
    setQueryResult(result);
    setCurrentView('results');
  };

  const features = [
    {
      icon: Cpu,
      title: 'AI-Powered Analysis',
      description: 'Leverages advanced language models to understand natural language queries and break them down into structured function calls.'
    },
    {
      icon: Database,
      title: '50+ Functions',
      description: 'Comprehensive library of functions covering data processing, communication, analytics, security, and more.'
    },
    {
      icon: Network,
      title: 'Smart Orchestration',
      description: 'Intelligent dependency resolution and execution planning for complex multi-step workflows.'
    },
    {
      icon: Shield,
      title: 'Production Ready',
      description: 'Built with modern web technologies, proper error handling, and scalable architecture.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Function Pipeline</h1>
                <p className="text-sm text-gray-600">Natural Language to Structured Function Calls</p>
              </div>
            </div>
            
            <nav className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('query')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'query' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <PlayCircle className="w-4 h-4" />
                <span>Query Interface</span>
              </button>
              
              <button
                onClick={() => setCurrentView('library')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'library' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Book className="w-4 h-4" />
                <span>Function Library</span>
              </button>
              
              <a
                href="https://github.com"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'query' && !queryResult && (
          <div className="space-y-12">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Transform Natural Language into 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {' '}Structured Function Calls
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our AI pipeline leverages state-of-the-art language models to analyze your queries, 
                  understand intent, and generate executable function sequences with proper dependency management.
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>7B Parameter Models</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>50+ Functions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Smart Orchestration</span>
                </div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Query Interface */}
            <QueryInterface onQueryResult={handleQueryResult} />
          </div>
        )}

        {currentView === 'results' && queryResult && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Query Results</h2>
              <button
                onClick={() => {
                  setCurrentView('query');
                  setQueryResult(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Query
              </button>
            </div>
            <ResultsDisplay result={queryResult} />
          </div>
        )}

        {currentView === 'library' && (
          <div className="space-y-6">
            <FunctionLibrary />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">AI Function Pipeline</span>
            </div>
            <p className="text-sm text-gray-600">
              Demonstrating the power of AI-driven function calling and workflow orchestration
            </p>
            <div className="text-xs text-gray-500">
              Built with React, TypeScript, Tailwind CSS, and Framer Motion
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;