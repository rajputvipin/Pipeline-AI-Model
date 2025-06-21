export interface FunctionDefinition {
  name: string;
  description: string;
  category: string;
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
  returns: {
    type: string;
    description: string;
  };
  example?: string;
}

export interface FunctionCall {
  id: string;
  function: string;
  parameters: Record<string, any>;
  description: string;
  executionOrder: number;
  dependencies?: string[];
}

export interface ProcessedQuery {
  query: string;
  intent: string;
  complexity: 'simple' | 'medium' | 'complex';
  functionCalls: FunctionCall[];
  executionPlan: string;
  estimatedTime: number;
  confidence: number;
}

export interface AIModel {
  name: string;
  description: string;
  parameters: string;
  capabilities: string[];
  provider: string;
}