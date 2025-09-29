# Deployment & Development Guide

## Development Setup

### Prerequisites

#### System Requirements
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **GitHub Account**: For OAuth authentication setup

#### Recommended Tools
- **VSCode**: With TypeScript and Tailwind CSS extensions
- **Chrome DevTools**: For debugging and performance monitoring
- **Postman** or **Thunder Client**: For API testing

### Local Development Setup

#### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/guim0/dashboard-products.git
cd dashboard-products

# Install dependencies
npm install

# Verify installation
npm run build
```

#### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth Configuration
GITHUB_ID="your-github-oauth-client-id"
GITHUB_SECRET="your-github-oauth-client-secret"
```

##### Generate NextAuth Secret
```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (using Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

##### GitHub OAuth Setup
1. Navigate to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Configure the application:
   - **Application name**: `dashboard-products-local`
   - **Homepage URL**: `http://localhost:3000`
   - **Application description**: `Local development for Dashboard Products`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**
6. Add these values to your `.env.local` file

#### 3. Development Server
```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:3000
```

#### 4. Verify Setup
1. Open http://localhost:3000
2. Click "Log in" 
3. Test GitHub OAuth authentication
4. Create a new project to verify functionality

### Development Workflow

#### Branch Strategy
```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes
# Commit changes
git add .
git commit -m "Add your feature description"

# Push to your fork
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

#### Code Quality
```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint -- --fix

# Build the application
npm run build

# Start production server locally
npm run start
```

#### Development Commands
```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Production Deployment

### Vercel Deployment (Recommended)

#### Prerequisites
- Vercel account (free)
- GitHub repository access

#### Deployment Steps

1. **Connect Repository to Vercel**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Configure Project on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`
     - **Install Command**: `npm install`

3. **Environment Variables Setup**
   In Vercel dashboard, add environment variables:
   ```
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

4. **GitHub OAuth Production Setup**
   - Create a new OAuth App for production or update existing
   - **Homepage URL**: `https://your-domain.vercel.app`
   - **Authorization callback URL**: `https://your-domain.vercel.app/api/auth/callback/github`

5. **Deploy**
   - Push to main branch triggers automatic deployment
   - Or use Vercel CLI: `vercel --prod`

#### Vercel Configuration File
Create `vercel.json` in root directory:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXTAUTH_URL": "https://your-domain.vercel.app"
  }
}
```

### Alternative Deployment Options

#### Netlify
1. Connect GitHub repository
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
3. Add environment variables
4. Enable form processing for contact forms

#### Docker Deployment
Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

Build and run:
```bash
# Build Docker image
docker build -t dashboard-products .

# Run container
docker run -p 3000:3000 --env-file .env.local dashboard-products
```

#### Self-Hosted (VPS/Server)

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Application Deployment**
   ```bash
   # Clone repository
   git clone https://github.com/guim0/dashboard-products.git
   cd dashboard-products
   
   # Install dependencies
   npm ci --only=production
   
   # Build application
   npm run build
   
   # Create PM2 ecosystem file
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'dashboard-products',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   }
   EOF
   
   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Performance Optimization

### Build Optimization

#### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Your Next.js config
})

# Analyze bundle
ANALYZE=true npm run build
```

#### Image Optimization
```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

#### Code Splitting
```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton className="h-48 w-full" />,
  ssr: false
})
```

### Runtime Performance

#### Caching Strategy
```typescript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

#### Database Optimization (Future)
```typescript
// Connection pooling for database
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

## Monitoring & Analytics

### Error Monitoring

#### Sentry Integration
```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.js
import { init } from '@sentry/nextjs'

init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

#### Error Boundaries
```typescript
'use client'

import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }

    return this.props.children
  }
}
```

### Performance Monitoring

#### Web Vitals
```typescript
// app/layout.tsx
export function reportWebVitals(metric) {
  // Log to analytics service
  console.log(metric)
}
```

#### Lighthouse Audits
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --upload.target=temporary-public-storage
```

### Analytics Integration

#### Google Analytics
```typescript
// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
```

## Security Considerations

### Environment Security
- Never commit `.env` files to version control
- Use different secrets for development and production
- Rotate secrets regularly
- Use Vercel's environment variable encryption

### Application Security
- Keep dependencies updated: `npm audit fix`
- Use HTTPS in production
- Implement proper CORS policies
- Validate all user inputs
- Use Content Security Policy headers

### Authentication Security
- Use strong NextAuth secret
- Implement rate limiting for auth endpoints
- Monitor for suspicious login attempts
- Keep NextAuth.js updated

## Backup & Recovery

### Code Backup
- Use Git for version control
- Multiple remote repositories (GitHub + backup)
- Regular branch backups

### Data Backup (Future Database Integration)
```bash
# Database backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump database_name > backup_$DATE.sql
```

### Disaster Recovery Plan
1. Repository restoration from Git
2. Environment variable restoration
3. DNS configuration
4. SSL certificate renewal
5. Database restoration (if applicable)

## Maintenance Tasks

### Regular Updates
```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest

# Security audit
npm audit
npm audit fix
```

### Performance Reviews
- Monthly Lighthouse audits
- Bundle size monitoring
- Core Web Vitals tracking
- User experience metrics

### Security Reviews
- Quarterly dependency audits
- Authentication flow reviews
- Environment variable rotation
- Access log reviews