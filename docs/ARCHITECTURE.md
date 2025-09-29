# Architecture Documentation

## Overview

Dashboard Products is built using a modern, scalable architecture based on Next.js 14 with the App Router pattern. This document outlines the architectural decisions, patterns, and structure of the application.

## Architecture Patterns

### 1. **Component-Based Architecture**
- **UI Components**: Reusable, composable UI elements based on shadcn/ui
- **Feature Components**: Business logic components (modals, forms, pages)
- **Layout Components**: Structural components (navigation, layouts)

### 2. **Server-Side Rendering (SSR) with Next.js**
- **App Router**: File-based routing with layout support
- **Server Components**: Default server-side rendering for performance
- **Client Components**: Selective client-side interactivity

### 3. **Provider Pattern**
- **NextAuth Provider**: Authentication state management
- **Toast Provider**: Notification system
- **Theme Provider**: (Implicit through Tailwind CSS variables)

## Directory Structure

```
dashboard-products/
├── app/                     # Next.js App Router
│   ├── admin/              # Protected routes
│   ├── api/                # API endpoints
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # Primitive UI components
│   └── [feature-components] # Feature-specific components
├── lib/                    # Utility libraries
│   ├── mocked/             # Mock data layer
│   ├── utils/              # Utility functions
│   └── utils.ts            # Common utilities
├── provider/               # React context providers
├── public/                 # Static assets
├── middleware.ts           # Next.js middleware
└── [config-files]          # Configuration files
```

## Core Architectural Concepts

### 1. **Separation of Concerns**

#### Presentation Layer (Components)
- **UI Components** (`/components/ui/`): Pure presentation components
- **Feature Components** (`/components/`): Business logic integration
- **Layout Components** (`/app/layout.tsx`): Page structure

#### Business Logic Layer
- **Custom Hooks**: State management and side effects
- **Utility Functions** (`/lib/utils/`): Pure business logic
- **Data Layer** (`/lib/mocked/`): Data access and manipulation

#### Infrastructure Layer
- **Authentication** (`/app/api/auth/`): NextAuth.js configuration
- **Middleware** (`/middleware.ts`): Request/response processing
- **Configuration**: Environment and build configuration

### 2. **State Management Strategy**

#### Server State
- **NextAuth Session**: User authentication state
- **Route Protection**: Server-side authentication checks

#### Client State
- **React Hooks**: Local component state
- **Form State**: React Hook Form for form management
- **UI State**: Toast notifications, loading states

#### Data Flow
```
User Action → Component → Hook/Function → Mock Data → UI Update
```

### 3. **Component Design Patterns**

#### Compound Components
```typescript
<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Title</AlertDialogTitle>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>
```

#### Render Props / Children Functions
```typescript
const { toast } = useToast();
// Used with component composition
```

#### Higher-Order Components (HOCs)
```typescript
// withAuth HOC pattern in middleware
export default withAuth(function middleware(req) {
  // Authentication logic
});
```

## Data Architecture

### 1. **Mock Data Layer**

#### Data Generation
```typescript
// Centralized data generation
function generateMockData(numCompanies: number, projectsPerCompany: number) {
  // Creates realistic mock data with relationships
}
```

#### Data Access Patterns
```typescript
// Single source of truth
export const { mockCompanies, addProjectToCompany, getCompanyDetails } = 
  generateMockData(5, 5);
```

### 2. **Type Safety**

#### Interface Definitions
```typescript
interface IProject {
  // Strongly typed project structure
}

interface ICompany {
  // Company with project relationships
}
```

#### Type Guards and Validation
- React Hook Form schema validation
- TypeScript compile-time checks
- Runtime validation for form inputs

## Authentication Architecture

### 1. **NextAuth.js Integration**

#### Provider Configuration
```typescript
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({ /* mock credentials */ }),
    Github({ /* OAuth configuration */ })
  ],
  callbacks: {
    jwt: ({ token }) => {
      token.role = "admin";
      return token;
    }
  }
};
```

#### Session Management
- **Server-side**: `getServerSession()` for SSR
- **Client-side**: `useSession()` hook for CSR
- **Middleware**: Route-level protection

### 2. **Authorization Flow**

```
Request → Middleware → Auth Check → Route Access/Redirect
```

#### Protected Routes
- `/admin/*` routes require authentication
- Dynamic middleware configuration
- Role-based access control

## UI Architecture

### 1. **Design System**

#### Component Hierarchy
```
shadcn/ui (Base) → Custom Components → Feature Components → Pages
```

#### Styling Strategy
- **Tailwind CSS**: Utility-first styling
- **CSS Variables**: Theme customization
- **Component Variants**: `class-variance-authority`

#### Responsive Design
- Mobile-first approach
- Flexbox and Grid layouts
- Breakpoint-based responsive utilities

### 2. **Component Composition**

#### UI Component Example
```typescript
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card", className)}
      {...props}
    />
  )
);
```

#### Feature Component Integration
```typescript
export const StatusProject = ({ status }: IStatusProject) => {
  const statusStyles = { /* styling configuration */ };
  return <Badge className={cn(statusStyles[status])} />;
};
```

## Performance Architecture

### 1. **Rendering Optimization**

#### Server-Side Rendering
- Static generation where possible
- Server components by default
- Selective client-side hydration

#### Client-Side Optimization
- Component-level code splitting
- Lazy loading for non-critical components
- Image optimization with Next.js

### 2. **Bundle Optimization**

#### Tree Shaking
- ES modules for better tree shaking
- Selective imports from libraries
- Dead code elimination

#### Code Splitting
- Route-based splitting (automatic)
- Dynamic imports for heavy components
- Vendor bundle optimization

## Deployment Architecture

### 1. **Build Process**

```
Source Code → TypeScript Compilation → Bundle Optimization → Static Generation
```

#### Static Generation
- Pre-rendered pages where possible
- API routes for dynamic functionality
- Optimized asset generation

### 2. **Environment Configuration**

#### Development
```env
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID="dev-client-id"
GITHUB_SECRET="dev-client-secret"
```

#### Production
```env
NEXTAUTH_URL="https://yourdomain.com"
GITHUB_ID="prod-client-id"
GITHUB_SECRET="prod-client-secret"
```

## Security Architecture

### 1. **Authentication Security**

#### OAuth Flow
```
User → GitHub → OAuth Callback → NextAuth → Session Creation
```

#### Token Management
- HTTP-only cookies for session tokens
- Secure token storage
- Automatic token refresh

### 2. **Application Security**

#### Route Protection
- Middleware-based authentication
- Server-side session validation
- Client-side route guards

#### Data Security
- Environment variable management
- No sensitive data in client bundles
- CSRF protection built-in

## Scalability Considerations

### 1. **Code Organization**

#### Modular Structure
- Feature-based organization
- Reusable component library
- Clear separation of concerns

#### Type Safety
- Comprehensive TypeScript coverage
- Interface-driven development
- Compile-time error catching

### 2. **Performance Scalability**

#### Caching Strategy
- Next.js automatic caching
- Component memoization where needed
- Static asset optimization

#### Future Considerations
- Database integration patterns
- API layer abstraction
- State management scaling (Redux, Zustand)