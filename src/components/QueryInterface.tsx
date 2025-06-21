import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Zap, Brain, Settings } from 'lucide-react';
import { aiService, availableModels } from '../services/aiService';
import { ProcessedQuery } from '../types';

interface QueryInterfaceProps {
  onQueryResult: (result: ProcessedQuery) => void;
}

export const QueryInterface: React.FC<QueryInterfaceProps> = ({ onQueryResult }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(availableModels[0].name);
  const [showModelSelector, setShowModelSelector] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const result = await aiService.processQuery(query);
      onQueryResult(result);
    } catch (error) {
      console.error('Error processing query:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    aiService.setModel(modelName);
    setShowModelSelector(false);
  };

  const exampleQueries = [
    "Retrieve all invoices for March, calculate the total amount, and email the summary to finance@company.com",
    "Get customer data for user ID 12345, analyze their purchase history, and generate a personalized report",
    "Search for all orders with status 'pending', filter by high-value customers, and create automated follow-up notifications",
    "Analyze sales data from the last quarter, generate performance metrics, and create visualizations for the dashboard"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Model Selection Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI Function Pipeline</h2>
            <p className="text-sm text-gray-600">Natural language to structured function calls</p>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowModelSelector(!showModelSelector)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">{selectedModel}</span>
          </button>
          
          {showModelSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            >
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Select AI Model</h3>
                {availableModels.map((model) => (
                  <button
                    key={model.name}
                    onClick={() => handleModelChange(model.name)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                      selectedModel === model.name
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{model.name}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{model.parameters}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{model.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities.map((cap) => (
                        <span key={cap} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Query Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you want to accomplish in natural language..."
            className="w-full h-32 p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {/* Example Queries */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-500" />
          Example Queries
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleQueries.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => setQuery(example)}
              className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {example}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Processing Status */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-6 bg-blue-50 rounded-lg"
        >
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
          <p className="text-blue-800 font-medium">Processing your query with {selectedModel}...</p>
          <p className="text-blue-600 text-sm mt-1">Analyzing intent and selecting appropriate functions</p>
        </motion.div>
      )}
    </div>
  );
};