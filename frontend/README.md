# AI Misinformation Detection Agent - Frontend

React-based web interface for the AI Misinformation Detection Agent. This frontend provides an intuitive user interface for submitting claims, viewing verification results, and monitoring misinformation trends.

## 🎯 Overview

The frontend is designed to make the AI Misinformation Detection Agent accessible to end users through a modern, responsive web interface. It communicates with the FastAPI backend to provide real-time fact-checking capabilities.

## 🚧 Current Status

**This frontend is currently in planning phase.** The backend API is fully functional and can be tested directly or integrated with any frontend framework.

## 🏗️ Planned Architecture

```
frontend/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── favicon.ico        # Application icon
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ClaimForm/     # Claim submission form
│   │   ├── ResultCard/    # Verification result display
│   │   ├── TrendsDashboard/ # Trends visualization
│   │   └── common/        # Shared components
│   ├── pages/             # Route components
│   │   ├── Home/          # Landing page
│   │   ├── Verify/        # Claim verification page
│   │   ├── Results/       # Results display page
│   │   └── Trends/        # Trends monitoring page
│   ├── services/          # API communication
│   │   ├── api.js         # Backend API client
│   │   └── websocket.js   # Real-time updates
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── styles/            # CSS/SCSS files
│   └── App.js             # Main application component
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
└── README.md             # This file
```

## 🚀 Planned Features

### Core Functionality
- **Claim Submission**: Simple form to submit claims for verification
- **Real-time Results**: Live updates on verification progress
- **Verification Details**: Comprehensive display of results, sources, and confidence scores
- **Trends Dashboard**: Visual representation of current misinformation trends

### User Experience
- **Responsive Design**: Mobile-first approach for all devices
- **Dark/Light Theme**: User preference settings
- **Search History**: Previously submitted claims
- **Export Results**: Download verification reports

### Advanced Features
- **Batch Processing**: Submit multiple claims simultaneously
- **API Integration**: Easy embedding in other websites
- **Analytics Dashboard**: Usage statistics and trends
- **Multi-language Support**: Internationalization ready

## 🛠️ Technology Stack (Planned)

### Core Framework
- **React 18+**: Modern React with hooks and concurrent features
- **TypeScript**: Type safety and better development experience
- **Next.js**: Server-side rendering and routing

### UI/UX
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible UI components
- **Framer Motion**: Smooth animations and transitions
- **React Hook Form**: Form management and validation

### State Management
- **Zustand**: Lightweight state management
- **React Query**: Server state management and caching

### Communication
- **Axios**: HTTP client for API calls
- **Socket.io**: Real-time communication with backend

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Jest**: Unit testing framework

## 🚀 Quick Start (When Implemented)

### Prerequisites
- Node.js 16+
- npm or yarn
- Backend service running (see [backend documentation](../backend/README.md))

### Installation
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_APP_NAME=AI Misinformation Detection Agent
```

## 📱 User Interface Design

### Landing Page
- Hero section explaining the service
- Quick claim submission form
- Recent verification statistics
- Featured misinformation trends

### Verification Flow
1. **Claim Input**: Text area with optional source URL
2. **Processing Indicator**: Progress bar with estimated time
3. **Results Display**: Verdict, confidence score, explanation, sources
4. **Action Buttons**: Share, export, report issues

### Trends Dashboard
- **Interactive Charts**: Trend visualization over time
- **Category Filters**: Filter by topic, confidence, date range
- **Export Options**: Download trend reports
- **Alert System**: Notifications for emerging trends

### Mobile Experience
- **Touch-Optimized**: Large buttons and easy navigation
- **Offline Support**: Cache results for offline viewing
- **PWA Features**: Install as mobile app

## 🔌 Backend Integration

### API Endpoints Used
```typescript
// Service layer example
class VerificationService {
  async submitClaim(claim: ClaimRequest): Promise<ClaimResponse> {
    return api.post('/v1/verify-claim/', claim);
  }

  async getResult(claimId: string): Promise<VerificationResult> {
    return api.get(`/v1/results/${claimId}`);
  }

  async getTrends(): Promise<Trend[]> {
    return api.get('/v1/trends/');
  }
}
```

### Real-time Updates
```typescript
// WebSocket integration for live updates
const useVerificationStatus = (claimId: string) => {
  const [status, setStatus] = useState('pending');
  
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/verification/${claimId}`);
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setStatus(update.status);
    };
    return () => ws.close();
  }, [claimId]);
  
  return status;
};
```

## 🎨 Design System

### Color Palette
```css
:root {
  --primary: #3B82F6;      /* Blue - Trust, reliability */
  --secondary: #10B981;     /* Green - Verified, safe */
  --warning: #F59E0B;       /* Amber - Uncertain, caution */
  --danger: #EF4444;        /* Red - False, dangerous */
  --neutral: #6B7280;       /* Gray - Information */
}
```

### Typography
- **Headings**: Inter, system fonts
- **Body**: System UI fonts for readability
- **Code**: JetBrains Mono for technical content

### Component Library
- Form inputs with validation states
- Result cards with confidence indicators
- Loading states and skeletons
- Modal dialogs and notifications

## 🧪 Testing Strategy

### Unit Tests
```bash
# Component testing
npm run test:unit

# Coverage report
npm run test:coverage
```

### Integration Tests
```bash
# End-to-end testing with Cypress
npm run test:e2e

# Visual regression testing
npm run test:visual
```

### Accessibility
- WCAG 2.1 AA compliance
- Screen reader testing
- Keyboard navigation
- Color contrast validation

## 📱 Progressive Web App

### Features
- **Offline Functionality**: Cache verification results
- **Push Notifications**: Alerts for completed verifications
- **Install Prompt**: Add to home screen
- **Background Sync**: Queue submissions when offline

### Implementation
```javascript
// Service worker for offline functionality
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/v1/results/')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
```

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Static export
npm run export

# Docker containerization
docker build -t misinformation-frontend .
```

### Environment Configuration
```bash
# Production environment
NEXT_PUBLIC_API_URL=https://api.misinformation-agent.com
NEXT_PUBLIC_WS_URL=wss://api.misinformation-agent.com/ws
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXXXXXX-X
```

## 🔒 Security Considerations

### Content Security Policy
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval';"
  }
];
```

### Data Handling
- No sensitive data stored in localStorage
- HTTPS-only in production
- Input sanitization for all user content
- XSS protection through React's built-in escaping

## 📊 Analytics and Monitoring

### User Analytics
- Page views and user flows
- Feature usage statistics
- Performance metrics
- Error tracking

### Implementation
```typescript
// Analytics service
class AnalyticsService {
  trackClaimSubmission(claimLength: number) {
    // Track user engagement
  }
  
  trackVerificationComplete(duration: number, verdict: string) {
    // Track system performance
  }
}
```

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement component with tests
3. Update Storybook documentation
4. Submit pull request with screenshots

### Code Standards
- TypeScript for type safety
- ESLint + Prettier for formatting
- Conventional commits for git messages
- Component documentation in Storybook

## 📚 Documentation

When implemented, additional documentation will include:
- **Storybook**: Component library documentation
- **API Docs**: Frontend API integration guide
- **Design System**: UI/UX guidelines
- **Deployment Guide**: Production setup instructions

## 🗺️ Implementation Roadmap

### Phase 1: Basic Interface (Week 1-2)
- [ ] Project setup with Next.js and TypeScript
- [ ] Basic claim submission form
- [ ] Results display page
- [ ] API integration layer

### Phase 2: Enhanced UX (Week 3-4)
- [ ] Real-time updates via WebSocket
- [ ] Responsive design implementation
- [ ] Loading states and error handling
- [ ] Basic trends dashboard

### Phase 3: Advanced Features (Week 5-6)
- [ ] User authentication and history
- [ ] Advanced trends visualization
- [ ] Export and sharing functionality
- [ ] PWA features

### Phase 4: Polish & Deploy (Week 7-8)
- [ ] Performance optimization
- [ ] Accessibility audit and fixes
- [ ] Comprehensive testing
- [ ] Production deployment

---

## 🆘 Getting Started (For Developers)

Until the frontend is implemented, you can:

1. **Test the API directly**: Use the backend's Swagger UI at http://localhost:8000/docs
2. **Create a simple HTML interface**: Basic form to test claim submission
3. **Use curl or Postman**: Direct API testing (see [backend README](../backend/README.md))

### Simple HTML Test Interface
```html
<!DOCTYPE html>
<html>
<head>
    <title>Misinformation Agent Test</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
    <h1>AI Misinformation Detection Agent</h1>
    <form id="claimForm">
        <textarea id="claimText" placeholder="Enter claim to verify..." rows="4" cols="50"></textarea><br>
        <input type="url" id="sourceUrl" placeholder="Source URL (optional)"><br>
        <button type="submit">Verify Claim</button>
    </form>
    <div id="results"></div>
    
    <script>
        document.getElementById('claimForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const claim = document.getElementById('claimText').value;
            const sourceUrl = document.getElementById('sourceUrl').value;
            
            try {
                const response = await axios.post('http://localhost:8000/v1/verify-claim/', {
                    content: claim,
                    source_url: sourceUrl || null
                });
                
                document.getElementById('results').innerHTML = 
                    `<p>Claim submitted! ID: ${response.data.claim_id}</p>
                     <p>Check results at: <a href="http://localhost:8000/v1/results/${response.data.claim_id}">
                     /v1/results/${response.data.claim_id}</a></p>`;
            } catch (error) {
                document.getElementById('results').innerHTML = 
                    `<p>Error: ${error.message}</p>`;
            }
        });
    </script>
</body>
</html>
```

For more information about the backend API, see the [backend documentation](../backend/README.md).