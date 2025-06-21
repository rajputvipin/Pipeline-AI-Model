import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Filter, Code, ChevronDown, ChevronUp } from 'lucide-react';
import { functionLibrary, getFunctionsByCategory } from '../data/functions';
import { FunctionDefinition } from '../types';

export const FunctionLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFunction, setExpandedFunction] = useState<string | null>(null);

  const categorizedFunctions = useMemo(() => getFunctionsByCategory(), []);
  const categories = ['All', ...Object.keys(categorizedFunctions)];

  const filteredFunctions = useMemo(() => {
    let functions = selectedCategory === 'All' 
      ? functionLibrary 
      : categorizedFunctions[selectedCategory] || [];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      functions = functions.filter(func =>
        func.name.toLowerCase().includes(query) ||
        func.description.toLowerCase().includes(query) ||
        func.category.toLowerCase().includes(query)
      );
    }

    return functions;
  }, [searchQuery, selectedCategory, categorizedFunctions]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Data Retrieval': 'bg-blue-100 text-blue-800',
      'Data Processing': 'bg-green-100 text-green-800',
      'Communication': 'bg-purple-100 text-purple-800',
      'File Operations': 'bg-orange-100 text-orange-800',
      'Authentication': 'bg-red-100 text-red-800',
      'Security': 'bg-red-100 text-red-800',
      'Integration': 'bg-yellow-100 text-yellow-800',
      'Analytics': 'bg-indigo-100 text-indigo-800',
      'Workflow': 'bg-pink-100 text-pink-800',
      'Validation': 'bg-teal-100 text-teal-800',
      'Utility': 'bg-gray-100 text-gray-800',
      'Machine Learning': 'bg-violet-100 text-violet-800',
      'Monitoring': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getParameterTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'string': 'bg-green-100 text-green-800',
      'number': 'bg-blue-100 text-blue-800',
      'boolean': 'bg-purple-100 text-purple-800',
      'array': 'bg-orange-100 text-orange-800',
      'object': 'bg-red-100 text-red-800',
      'any': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Function Library</h2>
              <p className="text-gray-600">Comprehensive collection of {functionLibrary.length} available functions</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search functions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category} {category !== 'All' && `(${categorizedFunctions[category]?.length || 0})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Function List */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {filteredFunctions.map((func, index) => (
              <motion.div
                key={func.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setExpandedFunction(
                    expandedFunction === func.name ? null : func.name
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Code className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{func.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{func.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(func.category)}`}>
                        {func.category}
                      </span>
                      {expandedFunction === func.name ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedFunction === func.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 bg-white"
                  >
                    <div className="p-4 space-y-4">
                      {/* Parameters */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Parameters</h4>
                        {func.parameters.length > 0 ? (
                          <div className="space-y-2">
                            {func.parameters.map((param, paramIndex) => (
                              <div key={paramIndex} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900">{param.name}</span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getParameterTypeColor(param.type)}`}>
                                      {param.type}
                                    </span>
                                    {param.required && (
                                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                                        Required
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">No parameters required</p>
                        )}
                      </div>

                      {/* Returns */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Returns</h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getParameterTypeColor(func.returns.type)}`}>
                              {func.returns.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{func.returns.description}</p>
                        </div>
                      </div>

                      {/* Example */}
                      {func.example && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Example</h4>
                          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg">
                            <code className="text-sm font-mono">{func.example}</code>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFunctions.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-600">No functions found matching your criteria.</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter settings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};