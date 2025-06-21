import { ProcessedQuery, FunctionCall } from '../types';
import { functionLibrary } from '../data/functions';

// Simulated AI models for demonstration
export const availableModels = [
  {
    name: 'Mistral-7B-Instruct',
    description: 'A powerful 7B parameter model optimized for instruction following and function calling',
    parameters: '7B',
    capabilities: ['Function Calling', 'Reasoning', 'Code Generation', 'Text Analysis'],
    provider: 'Mistral AI'
  },
  {
    name: 'CodeLlama-7B-Instruct',
    description: 'Specialized model for code understanding and generation with function calling',
    parameters: '7B',
    capabilities: ['Function Calling', 'Code Generation', 'API Integration', 'Workflow Planning'],
    provider: 'Meta'
  },
  {
    name: 'Phi-3-Mini-4K-Instruct',
    description: 'Compact but powerful model for efficient function calling and reasoning',
    parameters: '3.8B',
    capabilities: ['Function Calling', 'Reasoning', 'Task Planning', 'Data Processing'],
    provider: 'Microsoft'
  }
];

class AIService {
  private selectedModel = availableModels[0];
  private isProcessing = false;

  setModel(modelName: string) {
    const model = availableModels.find(m => m.name === modelName);
    if (model) {
      this.selectedModel = model;
    }
  }

  getSelectedModel() {
    return this.selectedModel;
  }

  async processQuery(query: string): Promise<ProcessedQuery> {
    if (this.isProcessing) {
      throw new Error('Already processing a query. Please wait.');
    }

    this.isProcessing = true;
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      // This is a mock implementation that demonstrates the concept
      // In a real implementation, this would call the actual AI model
      const result = await this.mockAIProcessing(query);
      
      return result;
    } finally {
      this.isProcessing = false;
    }
  }

  private async mockAIProcessing(query: string): Promise<ProcessedQuery> {
    // Simulate AI reasoning and function selection
    const lowerQuery = query.toLowerCase();
    const functionCalls: FunctionCall[] = [];
    let executionOrder = 1;
    
    // Simple keyword-based function selection (in real implementation, this would use the AI model)
    const functionSelectionRules = [
      {
        keywords: ['invoice', 'billing', 'payment'],
        functions: ['retrieveInvoices', 'calculateTotal', 'generateSummary']
      },
      {
        keywords: ['email', 'send', 'notify'],
        functions: ['sendEmail', 'createNotification']
      },
      {
        keywords: ['report', 'generate', 'export'],
        functions: ['generateReport', 'exportData']
      },
      {
        keywords: ['customer', 'user', 'client'],
        functions: ['getCustomerData', 'validatePermissions']
      },
      {
        keywords: ['data', 'retrieve', 'fetch', 'get'],
        functions: ['searchDatabase', 'filterData', 'sortData']
      },
      {
        keywords: ['analyze', 'analysis', 'metrics'],
        functions: ['performAnalysis', 'generateMetrics', 'createChart']
      },
      {
        keywords: ['workflow', 'automate', 'schedule'],
        functions: ['createWorkflow', 'scheduleTask']
      },
      {
        keywords: ['authenticate', 'login', 'security'],
        functions: ['authenticateUser', 'validatePermissions', 'auditLog']
      }
    ];

    // Determine complexity based on query length and keywords
    const complexity = this.determineComplexity(query);
    
    // Select functions based on keywords
    const selectedFunctions = new Set<string>();
    
    functionSelectionRules.forEach(rule => {
      if (rule.keywords.some(keyword => lowerQuery.includes(keyword))) {
        rule.functions.forEach(func => selectedFunctions.add(func));
      }
    });

    // If no specific functions matched, add some general ones
    if (selectedFunctions.size === 0) {
      selectedFunctions.add('searchDatabase');
      selectedFunctions.add('generateSummary');
    }

    // Create function calls with simulated parameters
    Array.from(selectedFunctions).forEach(funcName => {
      const func = functionLibrary.find(f => f.name === funcName);
      if (func) {
        const parameters = this.generateMockParameters(func, query);
        
        functionCalls.push({
          id: `call_${executionOrder}`,
          function: funcName,
          parameters,
          description: this.generateCallDescription(func, parameters),
          executionOrder: executionOrder++,
          dependencies: executionOrder > 2 ? [`call_${executionOrder - 2}`] : undefined
        });
      }
    });

    // Generate execution plan
    const executionPlan = this.generateExecutionPlan(functionCalls);
    
    // Calculate estimated time (mock)
    const estimatedTime = functionCalls.length * 2 + Math.random() * 5;
    
    // Determine intent
    const intent = this.determineIntent(query);
    
    // Calculate confidence (mock)
    const confidence = Math.min(0.95, 0.7 + (selectedFunctions.size * 0.05));

    return {
      query,
      intent,
      complexity,
      functionCalls,
      executionPlan,
      estimatedTime: Math.round(estimatedTime * 10) / 10,
      confidence: Math.round(confidence * 100) / 100
    };
  }

  private determineComplexity(query: string): 'simple' | 'medium' | 'complex' {
    const wordCount = query.split(' ').length;
    const complexKeywords = ['analyze', 'generate', 'process', 'integrate', 'workflow', 'multiple', 'all'];
    const hasComplexKeywords = complexKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );

    if (wordCount <= 5 && !hasComplexKeywords) return 'simple';
    if (wordCount <= 12 && !hasComplexKeywords) return 'medium';
    return 'complex';
  }

  private generateMockParameters(func: any, query: string): Record<string, any> {
    const params: Record<string, any> = {};
    
    func.parameters.forEach((param: any) => {
      if (param.required) {
        switch (param.type) {
          case 'string':
            if (param.name.includes('date') || param.name.includes('Date')) {
              params[param.name] = new Date().toISOString().split('T')[0];
            } else if (param.name.includes('email') || param.name.includes('Email')) {
              params[param.name] = 'user@example.com';
            } else {
              params[param.name] = `mock_${param.name}`;
            }
            break;
          case 'number':
            params[param.name] = Math.floor(Math.random() * 100);
            break;
          case 'boolean':
            params[param.name] = Math.random() > 0.5;
            break;
          case 'array':
            params[param.name] = ['item1', 'item2'];
            break;
          case 'object':
            params[param.name] = { key: 'value' };
            break;
          default:
            params[param.name] = 'mock_value';
        }
      }
    });

    return params;
  }

  private generateCallDescription(func: any, parameters: Record<string, any>): string {
    const paramList = Object.entries(parameters)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join(', ');
    
    return `${func.description} with parameters: ${paramList}`;
  }

  private generateExecutionPlan(functionCalls: FunctionCall[]): string {
    let plan = 'Execution Plan:\n\n';
    
    functionCalls.forEach((call, index) => {
      plan += `${index + 1}. ${call.function}()\n`;
      plan += `   └─ ${call.description}\n`;
      if (call.dependencies) {
        plan += `   └─ Depends on: ${call.dependencies.join(', ')}\n`;
      }
      plan += '\n';
    });
    
    plan += 'The functions will be executed in sequence, with each step building upon the results of the previous ones.';
    
    return plan;
  }

  private determineIntent(query: string): string {
    const intentKeywords = {
      'Data Retrieval': ['get', 'fetch', 'retrieve', 'find', 'search', 'show'],
      'Data Processing': ['calculate', 'process', 'analyze', 'filter', 'sort', 'aggregate'],
      'Communication': ['send', 'email', 'notify', 'message', 'alert'],
      'Reporting': ['report', 'generate', 'export', 'create', 'summary'],
      'Workflow Automation': ['automate', 'workflow', 'schedule', 'batch', 'bulk'],
      'Security': ['authenticate', 'validate', 'secure', 'encrypt', 'audit']
    };

    const lowerQuery = query.toLowerCase();
    
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        return intent;
      }
    }
    
    return 'General Query Processing';
  }

  isCurrentlyProcessing(): boolean {
    return this.isProcessing;
  }
}

export const aiService = new AIService();