import { FunctionDefinition } from '../types';

export const functionLibrary: FunctionDefinition[] = [
  // Data Retrieval Functions
  {
    name: 'retrieveInvoices',
    description: 'Retrieve invoices from the database based on date range or filters',
    category: 'Data Retrieval',
    parameters: [
      { name: 'startDate', type: 'string', description: 'Start date for invoice retrieval', required: true },
      { name: 'endDate', type: 'string', description: 'End date for invoice retrieval', required: true },
      { name: 'status', type: 'string', description: 'Invoice status filter', required: false },
      { name: 'customerId', type: 'string', description: 'Customer ID filter', required: false }
    ],
    returns: { type: 'array', description: 'Array of invoice objects' },
    example: 'retrieveInvoices("2024-03-01", "2024-03-31", "paid")'
  },
  {
    name: 'getCustomerData',
    description: 'Fetch customer information and transaction history',
    category: 'Data Retrieval',
    parameters: [
      { name: 'customerId', type: 'string', description: 'Unique customer identifier', required: true },
      { name: 'includeHistory', type: 'boolean', description: 'Include transaction history', required: false }
    ],
    returns: { type: 'object', description: 'Customer data object with optional history' }
  },
  {
    name: 'fetchProductCatalog',
    description: 'Retrieve product catalog with pricing and availability',
    category: 'Data Retrieval',
    parameters: [
      { name: 'category', type: 'string', description: 'Product category filter', required: false },
      { name: 'inStock', type: 'boolean', description: 'Filter by stock availability', required: false }
    ],
    returns: { type: 'array', description: 'Array of product objects' }
  },
  {
    name: 'getOrderHistory',
    description: 'Retrieve order history with filtering options',
    category: 'Data Retrieval',
    parameters: [
      { name: 'customerId', type: 'string', description: 'Customer ID', required: false },
      { name: 'dateRange', type: 'object', description: 'Date range object', required: false },
      { name: 'status', type: 'string', description: 'Order status', required: false }
    ],
    returns: { type: 'array', description: 'Array of order objects' }
  },
  {
    name: 'searchDatabase',
    description: 'Perform complex database searches with multiple criteria',
    category: 'Data Retrieval',
    parameters: [
      { name: 'table', type: 'string', description: 'Database table name', required: true },
      { name: 'criteria', type: 'object', description: 'Search criteria object', required: true },
      { name: 'limit', type: 'number', description: 'Maximum results to return', required: false }
    ],
    returns: { type: 'array', description: 'Search results array' }
  },

  // Data Processing Functions
  {
    name: 'calculateTotal',
    description: 'Calculate totals and perform mathematical operations on datasets',
    category: 'Data Processing',
    parameters: [
      { name: 'data', type: 'array', description: 'Array of numeric data or objects', required: true },
      { name: 'field', type: 'string', description: 'Field to calculate from objects', required: false },
      { name: 'operation', type: 'string', description: 'Operation type (sum, avg, max, min)', required: false }
    ],
    returns: { type: 'number', description: 'Calculated result' }
  },
  {
    name: 'generateSummary',
    description: 'Generate summary statistics and insights from data',
    category: 'Data Processing',
    parameters: [
      { name: 'data', type: 'array', description: 'Data to summarize', required: true },
      { name: 'metrics', type: 'array', description: 'Metrics to include in summary', required: false }
    ],
    returns: { type: 'object', description: 'Summary object with statistics' }
  },
  {
    name: 'filterData',
    description: 'Filter datasets based on specified criteria',
    category: 'Data Processing',
    parameters: [
      { name: 'data', type: 'array', description: 'Data to filter', required: true },
      { name: 'filters', type: 'object', description: 'Filter criteria', required: true }
    ],
    returns: { type: 'array', description: 'Filtered data array' }
  },
  {
    name: 'sortData',
    description: 'Sort data by specified fields and order',
    category: 'Data Processing',
    parameters: [
      { name: 'data', type: 'array', description: 'Data to sort', required: true },
      { name: 'field', type: 'string', description: 'Field to sort by', required: true },
      { name: 'order', type: 'string', description: 'Sort order (asc/desc)', required: false }
    ],
    returns: { type: 'array', description: 'Sorted data array' }
  },
  {
    name: 'aggregateData',
    description: 'Perform data aggregation operations like grouping and counting',
    category: 'Data Processing',
    parameters: [
      { name: 'data', type: 'array', description: 'Data to aggregate', required: true },
      { name: 'groupBy', type: 'string', description: 'Field to group by', required: true },
      { name: 'aggregation', type: 'string', description: 'Aggregation function', required: true }
    ],
    returns: { type: 'object', description: 'Aggregated results' }
  },

  // Communication Functions
  {
    name: 'sendEmail',
    description: 'Send email notifications with attachments and formatting',
    category: 'Communication',
    parameters: [
      { name: 'recipient', type: 'string', description: 'Email recipient address', required: true },
      { name: 'subject', type: 'string', description: 'Email subject line', required: true },
      { name: 'body', type: 'string', description: 'Email body content', required: true },
      { name: 'attachments', type: 'array', description: 'File attachments', required: false }
    ],
    returns: { type: 'boolean', description: 'Success status of email delivery' }
  },
  {
    name: 'sendSMS',
    description: 'Send SMS messages to mobile numbers',
    category: 'Communication',
    parameters: [
      { name: 'phoneNumber', type: 'string', description: 'Recipient phone number', required: true },
      { name: 'message', type: 'string', description: 'SMS message content', required: true }
    ],
    returns: { type: 'object', description: 'SMS delivery status and ID' }
  },
  {
    name: 'createNotification',
    description: 'Create system notifications for users',
    category: 'Communication',
    parameters: [
      { name: 'userId', type: 'string', description: 'Target user ID', required: true },
      { name: 'message', type: 'string', description: 'Notification message', required: true },
      { name: 'priority', type: 'string', description: 'Notification priority level', required: false }
    ],
    returns: { type: 'string', description: 'Notification ID' }
  },
  {
    name: 'scheduleReminder',
    description: 'Schedule reminders for future dates',
    category: 'Communication',
    parameters: [
      { name: 'userId', type: 'string', description: 'User to remind', required: true },
      { name: 'message', type: 'string', description: 'Reminder message', required: true },
      { name: 'scheduledTime', type: 'string', description: 'When to send reminder', required: true }
    ],
    returns: { type: 'string', description: 'Reminder ID' }
  },

  // File Operations
  {
    name: 'generateReport',
    description: 'Generate formatted reports in various formats (PDF, Excel, HTML)',
    category: 'File Operations',
    parameters: [
      { name: 'data', type: 'object', description: 'Report data', required: true },
      { name: 'template', type: 'string', description: 'Report template name', required: true },
      { name: 'format', type: 'string', description: 'Output format (pdf, excel, html)', required: false }
    ],
    returns: { type: 'string', description: 'Generated report file path' }
  },
  {
    name: 'exportData',
    description: 'Export data to various file formats',
    category: 'File Operations',
    parameters: [
      { name: 'data', type: 'array', description: 'Data to export', required: true },
      { name: 'format', type: 'string', description: 'Export format (csv, json, xml)', required: true },
      { name: 'filename', type: 'string', description: 'Output filename', required: false }
    ],
    returns: { type: 'string', description: 'Exported file path' }
  },
  {
    name: 'uploadFile',
    description: 'Upload files to cloud storage or file system',
    category: 'File Operations',
    parameters: [
      { name: 'file', type: 'object', description: 'File object to upload', required: true },
      { name: 'destination', type: 'string', description: 'Upload destination path', required: true }
    ],
    returns: { type: 'string', description: 'Uploaded file URL or path' }
  },
  {
    name: 'processDocument',
    description: 'Process and extract data from documents',
    category: 'File Operations',
    parameters: [
      { name: 'filePath', type: 'string', description: 'Path to document file', required: true },
      { name: 'extractionType', type: 'string', description: 'Type of data to extract', required: true }
    ],
    returns: { type: 'object', description: 'Extracted document data' }
  },

  // Authentication & Security
  {
    name: 'authenticateUser',
    description: 'Authenticate user credentials and generate session tokens',
    category: 'Authentication',
    parameters: [
      { name: 'username', type: 'string', description: 'User login name', required: true },
      { name: 'password', type: 'string', description: 'User password', required: true },
      { name: 'mfaCode', type: 'string', description: 'Multi-factor authentication code', required: false }
    ],
    returns: { type: 'object', description: 'Authentication result with token' }
  },
  {
    name: 'validatePermissions',
    description: 'Check user permissions for specific actions',
    category: 'Authentication',
    parameters: [
      { name: 'userId', type: 'string', description: 'User ID to check', required: true },
      { name: 'resource', type: 'string', description: 'Resource being accessed', required: true },
      { name: 'action', type: 'string', description: 'Action being performed', required: true }
    ],
    returns: { type: 'boolean', description: 'Permission validation result' }
  },
  {
    name: 'encryptData',
    description: 'Encrypt sensitive data using various algorithms',
    category: 'Security',
    parameters: [
      { name: 'data', type: 'string', description: 'Data to encrypt', required: true },
      { name: 'algorithm', type: 'string', description: 'Encryption algorithm', required: false }
    ],
    returns: { type: 'string', description: 'Encrypted data string' }
  },
  {
    name: 'auditLog',
    description: 'Create audit log entries for security tracking',
    category: 'Security',
    parameters: [
      { name: 'userId', type: 'string', description: 'User performing action', required: true },
      { name: 'action', type: 'string', description: 'Action performed', required: true },
      { name: 'resource', type: 'string', description: 'Resource affected', required: true },
      { name: 'metadata', type: 'object', description: 'Additional audit data', required: false }
    ],
    returns: { type: 'string', description: 'Audit log entry ID' }
  },

  // Integration Functions
  {
    name: 'callWebhook',
    description: 'Make HTTP requests to external webhook endpoints',
    category: 'Integration',
    parameters: [
      { name: 'url', type: 'string', description: 'Webhook URL', required: true },
      { name: 'method', type: 'string', description: 'HTTP method', required: false },
      { name: 'payload', type: 'object', description: 'Request payload', required: false },
      { name: 'headers', type: 'object', description: 'Request headers', required: false }
    ],
    returns: { type: 'object', description: 'Webhook response data' }
  },
  {
    name: 'syncDatabase',
    description: 'Synchronize data between different database systems',
    category: 'Integration',
    parameters: [
      { name: 'sourceDb', type: 'string', description: 'Source database connection', required: true },
      { name: 'targetDb', type: 'string', description: 'Target database connection', required: true },
      { name: 'tables', type: 'array', description: 'Tables to synchronize', required: true }
    ],
    returns: { type: 'object', description: 'Synchronization result summary' }
  },
  {
    name: 'connectAPI',
    description: 'Establish connections to third-party APIs',
    category: 'Integration',
    parameters: [
      { name: 'apiEndpoint', type: 'string', description: 'API endpoint URL', required: true },
      { name: 'credentials', type: 'object', description: 'API credentials', required: true },
      { name: 'config', type: 'object', description: 'Connection configuration', required: false }
    ],
    returns: { type: 'object', description: 'API connection object' }
  },

  // Analytics Functions
  {
    name: 'generateMetrics',
    description: 'Calculate business metrics and KPIs from data',
    category: 'Analytics',
    parameters: [
      { name: 'data', type: 'array', description: 'Source data for metrics', required: true },
      { name: 'metricTypes', type: 'array', description: 'Types of metrics to calculate', required: true },
      { name: 'timeRange', type: 'object', description: 'Time range for analysis', required: false }
    ],
    returns: { type: 'object', description: 'Calculated metrics object' }
  },
  {
    name: 'createChart',
    description: 'Generate visualizations and charts from data',
    category: 'Analytics',
    parameters: [
      { name: 'data', type: 'array', description: 'Chart data', required: true },
      { name: 'chartType', type: 'string', description: 'Type of chart to create', required: true },
      { name: 'options', type: 'object', description: 'Chart styling options', required: false }
    ],
    returns: { type: 'object', description: 'Chart configuration object' }
  },
  {
    name: 'performAnalysis',
    description: 'Perform statistical analysis on datasets',
    category: 'Analytics',
    parameters: [
      { name: 'data', type: 'array', description: 'Data to analyze', required: true },
      { name: 'analysisType', type: 'string', description: 'Type of analysis to perform', required: true },
      { name: 'parameters', type: 'object', description: 'Analysis parameters', required: false }
    ],
    returns: { type: 'object', description: 'Analysis results' }
  },
  {
    name: 'trackEvent',
    description: 'Track user events and behaviors for analytics',
    category: 'Analytics',
    parameters: [
      { name: 'eventName', type: 'string', description: 'Name of the event', required: true },
      { name: 'userId', type: 'string', description: 'User ID', required: false },
      { name: 'properties', type: 'object', description: 'Event properties', required: false }
    ],
    returns: { type: 'boolean', description: 'Event tracking success status' }
  },

  // Workflow Functions
  {
    name: 'createWorkflow',
    description: 'Create automated workflows with multiple steps',
    category: 'Workflow',
    parameters: [
      { name: 'name', type: 'string', description: 'Workflow name', required: true },
      { name: 'steps', type: 'array', description: 'Workflow steps configuration', required: true },
      { name: 'triggers', type: 'array', description: 'Workflow triggers', required: true }
    ],
    returns: { type: 'string', description: 'Created workflow ID' }
  },
  {
    name: 'executeWorkflow',
    description: 'Execute a predefined workflow',
    category: 'Workflow',
    parameters: [
      { name: 'workflowId', type: 'string', description: 'Workflow ID to execute', required: true },
      { name: 'input', type: 'object', description: 'Input data for workflow', required: false }
    ],
    returns: { type: 'object', description: 'Workflow execution result' }
  },
  {
    name: 'scheduleTask',
    description: 'Schedule tasks for future execution',
    category: 'Workflow',
    parameters: [
      { name: 'task', type: 'object', description: 'Task configuration', required: true },
      { name: 'schedule', type: 'string', description: 'Cron schedule expression', required: true }
    ],
    returns: { type: 'string', description: 'Scheduled task ID' }
  },

  // Validation Functions
  {
    name: 'validateInput',
    description: 'Validate input data against predefined schemas',
    category: 'Validation',
    parameters: [
      { name: 'data', type: 'object', description: 'Data to validate', required: true },
      { name: 'schema', type: 'object', description: 'Validation schema', required: true }
    ],
    returns: { type: 'object', description: 'Validation result with errors if any' }
  },
  {
    name: 'sanitizeData',
    description: 'Clean and sanitize data for security',
    category: 'Validation',
    parameters: [
      { name: 'data', type: 'any', description: 'Data to sanitize', required: true },
      { name: 'rules', type: 'array', description: 'Sanitization rules', required: false }
    ],
    returns: { type: 'any', description: 'Sanitized data' }
  },
  {
    name: 'checkConstraints',
    description: 'Verify data meets business constraints',
    category: 'Validation',
    parameters: [
      { name: 'data', type: 'object', description: 'Data to check', required: true },
      { name: 'constraints', type: 'array', description: 'Business constraints', required: true }
    ],
    returns: { type: 'object', description: 'Constraint validation results' }
  },

  // Utility Functions
  {
    name: 'formatDate',
    description: 'Format dates according to specified patterns',
    category: 'Utility',
    parameters: [
      { name: 'date', type: 'string', description: 'Date to format', required: true },
      { name: 'format', type: 'string', description: 'Date format pattern', required: true },
      { name: 'timezone', type: 'string', description: 'Target timezone', required: false }
    ],
    returns: { type: 'string', description: 'Formatted date string' }
  },
  {
    name: 'generateId',
    description: 'Generate unique identifiers',
    category: 'Utility',
    parameters: [
      { name: 'type', type: 'string', description: 'ID type (uuid, sequential, custom)', required: false },
      { name: 'prefix', type: 'string', description: 'ID prefix', required: false }
    ],
    returns: { type: 'string', description: 'Generated unique ID' }
  },
  {
    name: 'convertUnits',
    description: 'Convert between different units of measurement',
    category: 'Utility',
    parameters: [
      { name: 'value', type: 'number', description: 'Value to convert', required: true },
      { name: 'fromUnit', type: 'string', description: 'Source unit', required: true },
      { name: 'toUnit', type: 'string', description: 'Target unit', required: true }
    ],
    returns: { type: 'number', description: 'Converted value' }
  },
  {
    name: 'parseJSON',
    description: 'Parse and validate JSON strings',
    category: 'Utility',
    parameters: [
      { name: 'jsonString', type: 'string', description: 'JSON string to parse', required: true },
      { name: 'schema', type: 'object', description: 'Optional validation schema', required: false }
    ],
    returns: { type: 'object', description: 'Parsed JSON object' }
  },
  {
    name: 'compressData',
    description: 'Compress data for storage or transmission',
    category: 'Utility',
    parameters: [
      { name: 'data', type: 'any', description: 'Data to compress', required: true },
      { name: 'algorithm', type: 'string', description: 'Compression algorithm', required: false }
    ],
    returns: { type: 'string', description: 'Compressed data' }
  },

  // Machine Learning Functions
  {
    name: 'trainModel',
    description: 'Train machine learning models with provided data',
    category: 'Machine Learning',
    parameters: [
      { name: 'trainingData', type: 'array', description: 'Training dataset', required: true },
      { name: 'modelType', type: 'string', description: 'Type of ML model', required: true },
      { name: 'parameters', type: 'object', description: 'Training parameters', required: false }
    ],
    returns: { type: 'object', description: 'Trained model object' }
  },
  {
    name: 'predictValues',
    description: 'Make predictions using trained models',
    category: 'Machine Learning',
    parameters: [
      { name: 'model', type: 'object', description: 'Trained model object', required: true },
      { name: 'inputData', type: 'array', description: 'Input data for prediction', required: true }
    ],
    returns: { type: 'array', description: 'Predicted values' }
  },
  {
    name: 'classifyText',
    description: 'Classify text using natural language processing',
    category: 'Machine Learning',
    parameters: [
      { name: 'text', type: 'string', description: 'Text to classify', required: true },
      { name: 'categories', type: 'array', description: 'Available categories', required: true }
    ],
    returns: { type: 'object', description: 'Classification result with confidence' }
  },
  {
    name: 'extractEntities',
    description: 'Extract named entities from text',
    category: 'Machine Learning',
    parameters: [
      { name: 'text', type: 'string', description: 'Text to analyze', required: true },
      { name: 'entityTypes', type: 'array', description: 'Types of entities to extract', required: false }
    ],
    returns: { type: 'array', description: 'Extracted entities with positions' }
  },

  // Monitoring Functions
  {
    name: 'logActivity',
    description: 'Log system activities and events',
    category: 'Monitoring',
    parameters: [
      { name: 'level', type: 'string', description: 'Log level (info, warn, error)', required: true },
      { name: 'message', type: 'string', description: 'Log message', required: true },
      { name: 'metadata', type: 'object', description: 'Additional log data', required: false }
    ],
    returns: { type: 'string', description: 'Log entry ID' }
  },
  {
    name: 'monitorPerformance',
    description: 'Monitor system performance metrics',
    category: 'Monitoring',
    parameters: [
      { name: 'component', type: 'string', description: 'Component to monitor', required: true },
      { name: 'metrics', type: 'array', description: 'Metrics to track', required: true }
    ],
    returns: { type: 'object', description: 'Performance metrics data' }
  },
  {
    name: 'createAlert',
    description: 'Create system alerts based on conditions',
    category: 'Monitoring',
    parameters: [
      { name: 'condition', type: 'object', description: 'Alert trigger condition', required: true },
      { name: 'recipients', type: 'array', description: 'Alert recipients', required: true },
      { name: 'severity', type: 'string', description: 'Alert severity level', required: false }
    ],
    returns: { type: 'string', description: 'Alert configuration ID' }
  }
];

export const getFunctionsByCategory = () => {
  const categories: Record<string, FunctionDefinition[]> = {};
  functionLibrary.forEach(func => {
    if (!categories[func.category]) {
      categories[func.category] = [];
    }
    categories[func.category].push(func);
  });
  return categories;
};

export const searchFunctions = (query: string): FunctionDefinition[] => {
  const lowerQuery = query.toLowerCase();
  return functionLibrary.filter(func => 
    func.name.toLowerCase().includes(lowerQuery) ||
    func.description.toLowerCase().includes(lowerQuery) ||
    func.category.toLowerCase().includes(lowerQuery)
  );
};