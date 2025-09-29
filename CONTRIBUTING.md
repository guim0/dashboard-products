# Contributing Guide

Welcome to Dashboard Products! We're excited that you're interested in contributing to this project. This guide will help you get started with contributing to the codebase.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Process](#contributing-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Submitting Changes](#submitting-changes)
- [Review Process](#review-process)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, nationality
- Personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers are responsible for clarifying standards and are expected to take appropriate action in response to unacceptable behavior. Contact the project team at guimodev@gmail.com for reporting.

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Git** for version control
- **GitHub account** for pull requests
- **Code editor** (VSCode recommended)

### Recommended Tools

- **VSCode Extensions**:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/dashboard-products.git
cd dashboard-products

# Add the original repository as upstream
git remote add upstream https://github.com/guim0/dashboard-products.git
```

### 2. Install Dependencies

```bash
# Install project dependencies
npm install

# Verify installation
npm run build
```

### 3. Environment Configuration

```bash
# Copy environment example
cp .env.example .env.local

# Generate NextAuth secret
openssl rand -base64 32

# Add your GitHub OAuth credentials (see README.md for setup)
```

### 4. Start Development Server

```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### 5. Verify Setup

- Test authentication (both GitHub OAuth and credentials)
- Create a new project
- Verify charts and visualizations
- Test responsive design on different screen sizes

## Contributing Process

### 1. Choose an Issue

- Browse [open issues](https://github.com/guim0/dashboard-products/issues)
- Look for issues labeled `good first issue` for beginners
- Comment on the issue to let others know you're working on it
- Ask questions if anything is unclear

### 2. Create a Branch

```bash
# Ensure you're on the main branch and up to date
git checkout main
git pull upstream main

# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### Branch Naming Conventions

- **Features**: `feature/description-of-feature`
- **Bug fixes**: `fix/issue-description`
- **Documentation**: `docs/what-you-are-documenting`
- **Refactoring**: `refactor/component-or-area`
- **Performance**: `perf/optimization-description`

### 3. Make Changes

- Follow the coding standards outlined below
- Write tests for new functionality
- Update documentation as needed
- Ensure your changes don't break existing functionality

### 4. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npx tsc --noEmit

# Test build
npm run build

# Start production server locally
npm run start
```

### 5. Commit Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Add feature: brief description of changes"
```

## Coding Standards

### TypeScript Guidelines

#### Type Safety
```typescript
// ✅ Good: Explicit types
interface ProjectFormData {
  projectName: string;
  startDate: string;
  endDate: string;
  description: string;
  responsible: string;
}

// ✅ Good: Proper type annotations
const handleSubmit = (data: ProjectFormData): void => {
  // Implementation
}

// ❌ Avoid: Using 'any'
const handleSubmit = (data: any) => {
  // Implementation
}
```

#### Component Props
```typescript
// ✅ Good: Interface for props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant, size, ...props }) => {
  // Implementation
}
```

### React Guidelines

#### Component Structure
```typescript
// ✅ Good: Consistent component structure
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {children}
    </div>
  );
};

Component.displayName = "Component";
```

#### Hooks Usage
```typescript
// ✅ Good: Custom hooks for reusable logic
const useProjectForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>();
  
  const onSubmit = (data: ProjectFormData) => {
    // Handle submission
  };
  
  return { register, handleSubmit, errors, onSubmit };
};
```

### Styling Guidelines

#### Tailwind CSS
```typescript
// ✅ Good: Logical class ordering
className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"

// ✅ Good: Using cn utility for conditional classes
className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}

// ❌ Avoid: Arbitrary values when design tokens exist
className="p-[13px]" // Use p-3 or p-4 instead
```

#### Component Variants
```typescript
// ✅ Good: Using class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
  }
);
```

### File Organization

#### Directory Structure
```
components/
├── ui/                     # Base UI components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── feature-name/           # Feature-specific components
│   ├── FeatureComponent.tsx
│   └── index.ts
├── shared/                 # Shared components
│   └── SharedComponent.tsx
└── [ComponentName].tsx     # Top-level components
```

#### Import Organization
```typescript
// ✅ Good: Import order
// 1. React and third-party libraries
import React from 'react';
import { useSession } from 'next-auth/react';

// 2. Internal utilities and types
import { cn } from '@/lib/utils';
import type { ProjectData } from '@/types';

// 3. Components (ui first, then feature components)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProjectForm } from '@/components/ProjectForm';

// 4. Relative imports
import './Component.css';
```

## Testing Guidelines

### Unit Testing

#### Component Testing
```typescript
// components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
```

#### Utility Testing
```typescript
// lib/__tests__/utils.test.ts
import { cn } from '../utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional')).toBe('base conditional');
    expect(cn('base', false && 'conditional')).toBe('base');
  });
});
```

### Integration Testing

#### Form Testing
```typescript
// components/__tests__/ProjectForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectForm } from '../ProjectForm';

describe('ProjectForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    
    render(<ProjectForm onSubmit={mockOnSubmit} />);
    
    await user.type(screen.getByLabelText(/project name/i), 'Test Project');
    await user.type(screen.getByLabelText(/start date/i), '2024-01-01');
    await user.type(screen.getByLabelText(/end date/i), '2024-12-31');
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        projectName: 'Test Project',
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      });
    });
  });
});
```

### Test Coverage

Aim for:
- **Unit tests**: All utility functions and isolated components
- **Integration tests**: Forms and complex user interactions
- **E2E tests**: Critical user journeys (authentication, project creation)

## Documentation Guidelines

### Code Documentation

#### JSDoc Comments
```typescript
/**
 * Creates a new project in the specified company
 * @param companyId - The ID of the company to add the project to
 * @param projectData - The project information
 * @returns Promise that resolves when project is created
 * @throws {Error} When company is not found
 */
export const createProject = async (
  companyId: number, 
  projectData: ProjectFormData
): Promise<void> => {
  // Implementation
};
```

#### Component Documentation
```typescript
/**
 * Status badge component for displaying project status
 * 
 * @example
 * ```tsx
 * <StatusProject status="active" />
 * <StatusProject status="late" />
 * ```
 */
interface StatusProjectProps {
  /** Project status - determines badge color and text */
  status: 'active' | 'late' | 'done' | string;
  /** Additional CSS classes */
  className?: string;
}
```

### README Updates

When adding new features:
1. Update the features list in README.md
2. Add usage examples if applicable
3. Update the tech stack if new dependencies are added
4. Modify setup instructions if needed

### Documentation Files

Update relevant documentation:
- **API.md**: For new data structures or endpoints
- **COMPONENTS.md**: For new components or component changes
- **USER_GUIDE.md**: For new user-facing features
- **TROUBLESHOOTING.md**: For known issues and solutions

## Submitting Changes

### Pull Request Process

#### 1. Prepare Your Pull Request

```bash
# Ensure your branch is up to date
git checkout main
git pull upstream main
git checkout your-feature-branch
git rebase main

# Push your changes
git push origin your-feature-branch
```

#### 2. Create Pull Request

- Go to your fork on GitHub
- Click "New pull request"
- Choose the base repository and branch
- Fill out the pull request template

#### 3. Pull Request Template

```markdown
## Description
Brief description of changes and motivation

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested the changes manually

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

### Commit Message Guidelines

#### Format
```
type(scope): subject

body

footer
```

#### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Formatting, missing semicolons, etc.
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding missing tests
- **chore**: Changes to build process or auxiliary tools

#### Examples
```bash
feat(auth): add GitHub OAuth integration

- Implement GitHub OAuth provider
- Add environment variable configuration
- Update authentication flow

Closes #123

fix(form): resolve date validation issue

The end date validation was not properly comparing
with the start date, causing false positive errors.

Fixes #456

docs(readme): update installation instructions

- Add Node.js version requirement
- Clarify environment setup steps
- Fix broken links
```

## Review Process

### What Reviewers Look For

1. **Code Quality**
   - Follows established patterns
   - Is well-documented
   - Has appropriate tests

2. **Functionality**
   - Works as intended
   - Doesn't break existing features
   - Handles edge cases

3. **Performance**
   - Doesn't introduce performance regressions
   - Uses efficient algorithms and patterns

4. **Security**
   - No security vulnerabilities
   - Proper input validation
   - Secure coding practices

### Responding to Reviews

- **Be open to feedback**: Reviews help improve code quality
- **Ask questions**: If feedback is unclear, ask for clarification
- **Make requested changes**: Address all review comments
- **Test changes**: Verify that requested changes work correctly

### Review Timeline

- **Initial review**: Within 48-72 hours
- **Follow-up reviews**: Within 24 hours
- **Merge**: After approval from at least one maintainer

## Community

### Getting Help

- **GitHub Discussions**: For general questions and ideas
- **GitHub Issues**: For bug reports and feature requests
- **Email**: guimodev@gmail.com for direct contact
- **LinkedIn**: [guim0-dev](https://www.linkedin.com/in/guim0-dev)

### Suggesting Features

1. **Check existing issues**: Make sure it hasn't been suggested
2. **Create a detailed issue**: Explain the use case and benefits
3. **Discuss the implementation**: Be open to different approaches
4. **Volunteer to implement**: If you're willing to work on it

### Reporting Bugs

1. **Search existing issues**: Check if it's already reported
2. **Use the bug report template**: Provide detailed information
3. **Include reproduction steps**: Make it easy to reproduce
4. **Provide environment details**: OS, browser, versions, etc.

### Recognition

Contributors will be:
- Added to the contributors list in README.md
- Mentioned in release notes for significant contributions
- Invited to be maintainers for substantial ongoing contributions

## Release Process

### Version Management

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Schedule

- **Major releases**: Every 6-12 months
- **Minor releases**: Every 1-2 months
- **Patch releases**: As needed for critical bugs

Thank you for contributing to Dashboard Products! Your efforts help make this project better for everyone. 🚀