# AI Function Pipeline
https://ai-pipeline.netlify.app/

A sophisticated web application that transforms natural language queries into structured function call sequences using AI models. This project demonstrates the power of AI-driven function calling and workflow orchestration with a beautiful, production-ready interface.

![AI Function Pipeline](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

### Core Functionality
- **Natural Language Processing**: Convert human language queries into executable function sequences
- **AI Model Integration**: Support for multiple 3B-7B parameter models (Mistral-7B, CodeLlama-7B, Phi-3-Mini)
- **Comprehensive Function Library**: 50+ functions across 13 categories
- **Smart Orchestration**: Automatic dependency resolution and execution planning
- **Code Generation**: Generate executable JavaScript from function call pipelines

### User Interface
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Interactive Components**: Tabbed results view, expandable function library
- **Visual Flow Charts**: Clear representation of execution sequences
- **Responsive Design**: Seamless experience across all devices
- **Syntax Highlighting**: Beautiful code display with copy/download functionality

### Technical Features
- **Type Safety**: Full TypeScript implementation
- **Real-time Processing**: Simulated AI processing with realistic delays
- **Error Handling**: Comprehensive error management and user feedback
- **Performance Optimized**: Efficient rendering and state management

## 🛠 Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.5.3**: Type-safe development with full IntelliSense support
- **Vite 5.4.2**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4.1**: Utility-first CSS framework for rapid styling
- **Framer Motion 10.16.16**: Smooth animations and micro-interactions
- **Lucide React 0.344.0**: Beautiful, consistent icon library

### Code Display
- **React Syntax Highlighter 15.5.0**: Syntax highlighting for generated code
- **VS Code Dark Plus Theme**: Professional code appearance

### Development Tools
- **ESLint**: Code linting with React-specific rules
- **PostCSS**: CSS processing with Autoprefixer
- **TypeScript ESLint**: TypeScript-specific linting rules

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── QueryInterface.tsx    # Main query input interface
│   ├── ResultsDisplay.tsx    # Results visualization
│   └── FunctionLibrary.tsx   # Function browser
├── data/                # Static data and configurations
│   └── functions.ts         # Function library definitions
├── services/            # Business logic and API services
│   └── aiService.ts         # AI processing simulation
├── types/               # TypeScript type definitions
│   └── index.ts             # Core type definitions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🎯 Function Categories

The application includes 50+ functions organized into 13 categories:

1. **Data Retrieval** (5 functions)
   - `retrieveInvoices`, `getCustomerData`, `fetchProductCatalog`, etc.

2. **Data Processing** (5 functions)
   - `calculateTotal`, `generateSummary`, `filterData`, etc.

3. **Communication** (4 functions)
   - `sendEmail`, `sendSMS`, `createNotification`, etc.

4. **File Operations** (4 functions)
   - `generateReport`, `exportData`, `uploadFile`, etc.

5. **Authentication & Security** (4 functions)
   - `authenticateUser`, `validatePermissions`, `encryptData`, etc.

6. **Integration** (3 functions)
   - `callWebhook`, `syncDatabase`, `connectAPI`

7. **Analytics** (4 functions)
   - `generateMetrics`, `createChart`, `performAnalysis`, etc.

8. **Workflow** (3 functions)
   - `createWorkflow`, `executeWorkflow`, `scheduleTask`

9. **Validation** (3 functions)
   - `validateInput`, `sanitizeData`, `checkConstraints`

10. **Utility** (5 functions)
    - `formatDate`, `generateId`, `convertUnits`, etc.

11. **Machine Learning** (4 functions)
    - `trainModel`, `predictValues`, `classifyText`, etc.

12. **Monitoring** (3 functions)
    - `logActivity`, `monitorPerformance`, `createAlert`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-function-pipeline
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 💡 Usage Examples

### Example Query 1: Invoice Processing
```
"Retrieve all invoices for March, calculate the total amount, and email the summary to finance@company.com"
```

**Generated Function Sequence:**
1. `retrieveInvoices("2024-03-01", "2024-03-31")`
2. `calculateTotal(invoiceData, "amount")`
3. `sendEmail("finance@company.com", "Invoice Summary", summaryData)`

### Example Query 2: Customer Analysis
```
"Get customer data for user ID 12345, analyze their purchase history, and generate a personalized report"
```

**Generated Function Sequence:**
1. `getCustomerData("12345", true)`
2. `performAnalysis(customerData, "purchase_history")`
3. `generateReport(analysisResults, "customer_report_template")`

### Example Query 3: Order Management
```
"Search for all orders with status 'pending', filter by high-value customers, and create automated follow-up notifications"
```

**Generated Function Sequence:**
1. `searchDatabase("orders", {"status": "pending"})`
2. `filterData(orderData, {"customer_value": "high"})`
3. `createNotification(filteredCustomers, "follow_up_message")`

## 🏗 Architecture

### AI Service Layer
The `aiService.ts` implements a sophisticated query processing system that:
- Analyzes natural language input for intent and complexity
- Maps keywords to relevant functions using rule-based selection
- Generates realistic parameters for function calls
- Creates dependency graphs for execution ordering
- Produces executable JavaScript code

### Component Architecture
- **QueryInterface**: Handles user input and model selection
- **ResultsDisplay**: Multi-tabbed results visualization
- **FunctionLibrary**: Searchable, categorized function browser
- **App**: Main application shell with navigation

### Type System
Comprehensive TypeScript definitions ensure type safety:
- `FunctionDefinition`: Function metadata and parameters
- `FunctionCall`: Individual function call with dependencies
- `ProcessedQuery`: Complete query analysis results
- `AIModel`: AI model specifications

## 🎨 Design Philosophy

### Visual Design
- **Apple-level aesthetics**: Clean, sophisticated, and intuitive
- **Consistent spacing**: 8px grid system throughout
- **Color system**: Comprehensive color ramps with proper contrast
- **Typography**: Clear hierarchy with optimal line spacing

### User Experience
- **Progressive disclosure**: Complex information revealed contextually
- **Micro-interactions**: Smooth animations provide feedback
- **Responsive design**: Optimal experience across all devices
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🔧 Customization

### Adding New Functions
1. Define the function in `src/data/functions.ts`:
```typescript
{
  name: 'myNewFunction',
  description: 'Description of what the function does',
  category: 'Appropriate Category',
  parameters: [
    { name: 'param1', type: 'string', description: 'Parameter description', required: true }
  ],
  returns: { type: 'object', description: 'Return value description' },
  example: 'myNewFunction("example")'
}
```

### Adding New AI Models
1. Update `availableModels` in `src/services/aiService.ts`:
```typescript
{
  name: 'New-Model-Name',
  description: 'Model description',
  parameters: '7B',
  capabilities: ['Function Calling', 'Reasoning'],
  provider: 'Provider Name'
}
```

### Customizing UI Themes
The application uses Tailwind CSS for styling. Modify `tailwind.config.js` to customize:
- Color schemes
- Typography scales
- Spacing systems
- Breakpoints

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Connect your repository for automatic deployments
- **Vercel**: Zero-configuration deployment for React applications
- **AWS S3 + CloudFront**: Static hosting with CDN
- **Docker**: Containerized deployment

### Environment Variables
For production deployment, consider adding:
- `VITE_API_URL`: Backend API endpoint
- `VITE_AI_MODEL_API_KEY`: AI model API key
- `VITE_ANALYTICS_ID`: Analytics tracking ID

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting with ESLint
- Add comprehensive type definitions
- Include proper error handling
- Write descriptive commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mistral AI** for the Mistral-7B model architecture inspiration
- **Meta** for CodeLlama model concepts
- **Microsoft** for Phi-3 model innovations
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons

## 📞 Support

For questions, issues, or contributions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
