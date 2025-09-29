# API Documentation

## Overview

This document describes the API endpoints and data structures used in the Dashboard Products application.

## Authentication API

### NextAuth.js Endpoints

All authentication is handled by NextAuth.js which provides the following endpoints:

#### Sign In
- **Endpoint**: `/api/auth/signin`
- **Method**: GET
- **Description**: Displays the sign-in page with available providers
- **Providers**: 
  - GitHub OAuth
  - Credentials (mock user: username: "Jonh", password: "nextauth")

#### Sign Out
- **Endpoint**: `/api/auth/signout`
- **Method**: GET/POST
- **Description**: Signs out the current user and clears the session

#### Session
- **Endpoint**: `/api/auth/session`
- **Method**: GET
- **Description**: Returns the current user session
- **Response**:
```typescript
{
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}
```

#### Callback
- **Endpoint**: `/api/auth/callback/[provider]`
- **Method**: GET/POST
- **Description**: Handles OAuth callbacks from providers

## Data Structures

### IProject Interface
```typescript
interface IProject {
  id: number;
  project_name: string;
  progress: {
    month: string;
    desktop: number;
    mobile: number;
  }[];
  start_date: Date | string;
  end_date: Date | string;
  manager: string;
  detail: {
    status: "active" | "late" | "done" | string;
    progress_percentage: number;
  };
  description: string;
}
```

### ICompany Interface
```typescript
interface ICompany {
  id: number;
  company_name: string;
  projects: IProject[];
}
```

### INewProjectForm Interface
```typescript
interface INewProjectForm {
  projectName: string;
  startDate: string;
  endDate: string;
  description: string;
  responsible: string;
}
```

## Mock Data API

### Functions

#### `generateMockData(numCompanies: number, projectsPerCompany: number)`
- **Description**: Generates mock data for companies and projects
- **Parameters**:
  - `numCompanies`: Number of companies to generate (default: 5)
  - `projectsPerCompany`: Number of projects per company (default: 5)
- **Returns**: Object with `mockCompanies`, `addProjectToCompany`, and `getCompanyDetails`

#### `addProjectToCompany(companyId: number, newProject: INewProjectForm)`
- **Description**: Adds a new project to an existing company
- **Parameters**:
  - `companyId`: The ID of the company to add the project to
  - `newProject`: Project data from the form
- **Side Effects**: Updates the global `mockCompanies` array

#### `getCompanyDetails(companyId: number)`
- **Description**: Retrieves details for a specific company
- **Parameters**:
  - `companyId`: The ID of the company to retrieve
- **Returns**: `ICompany` object or `undefined` if not found

## Client-Side State Management

### useSession Hook
```typescript
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();

// Status values:
// "loading" - Session is being loaded
// "authenticated" - User is authenticated
// "unauthenticated" - User is not authenticated
```

### useToast Hook
```typescript
import { useToast } from "@/components/ui/use-toast";

const { toast } = useToast();

toast({
  title: "Success",
  description: "Project created successfully!",
  variant: "default" | "destructive"
});
```

## Form Validation

### Project Creation Form

The `NewProjectModal` component uses React Hook Form with the following validation rules:

```typescript
{
  projectName: {
    required: "O nome do projeto é obrigatório.",
    minLength: { value: 3, message: "Mínimo de 3 caracteres." }
  },
  startDate: {
    required: "A data de início é obrigatória."
  },
  endDate: {
    required: "A data de fim é obrigatória.",
    validate: (value) =>
      new Date(value) >= new Date(startDate) ||
      "A data de fim não pode ser anterior à data de início."
  },
  description: {
    required: "A descrição é obrigatória.",
    maxLength: { value: 500, message: "Máximo de 500 caracteres." }
  },
  responsible: {
    required: "O responsável é obrigatório."
  }
}
```

## Error Handling

### Authentication Errors
- Invalid credentials for the mock user
- OAuth failures (network issues, user cancellation)
- Session expiration

### Form Errors
- Validation errors are displayed inline with each field
- Toast notifications for successful operations
- Error boundaries for component failures

## Performance Considerations

### Data Loading
- Mock data is generated once and stored in memory
- No external API calls reduce latency
- Client-side state management minimizes re-renders

### Image Optimization
- Next.js automatic image optimization for user avatars
- SVG icons for better performance
- Lazy loading for charts and heavy components

## Security

### Authentication
- GitHub OAuth for secure authentication
- NextAuth.js handles token management securely
- Session tokens are HTTP-only cookies

### Authorization
- Middleware protects admin routes
- Role-based access control (admin role)
- Client-side route protection

### Data Protection
- No sensitive data stored in localStorage
- Environment variables for secrets
- CSRF protection built into NextAuth.js