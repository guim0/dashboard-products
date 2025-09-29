# Testing Documentation

## Testing Strategy

This document outlines the testing approach for the Dashboard Products application, including manual testing procedures, automated testing recommendations, and quality assurance guidelines.

## Manual Testing Procedures

### Authentication Testing

#### GitHub OAuth Flow
**Test Case**: Verify GitHub OAuth authentication works correctly

**Steps**:
1. Navigate to the application homepage
2. Click "Log in" button
3. Select GitHub OAuth option
4. Complete GitHub authorization
5. Verify redirect back to application
6. Confirm user session is created

**Expected Results**:
- Successful redirect to GitHub
- User grants permission
- Redirect back to application
- User name and avatar appear in navigation
- "Create Project" buttons become enabled

**Test Variations**:
- First-time user (new authorization)
- Returning user (existing authorization)
- User denies permission (should handle gracefully)

#### Credentials Authentication
**Test Case**: Verify mock credentials work correctly

**Steps**:
1. Navigate to the application homepage
2. Click "Log in" button
3. Select credentials option
4. Enter username: "Jonh"
5. Enter password: "nextauth"
6. Submit form

**Expected Results**:
- Successful authentication
- User session created
- Access to protected features

**Negative Test Cases**:
- Wrong username: Should show error
- Wrong password: Should show error
- Empty fields: Should show validation errors

#### Session Management
**Test Case**: Verify session persistence and logout

**Steps**:
1. Log in successfully
2. Refresh the page
3. Navigate between pages
4. Use hamburger menu to log out
5. Attempt to access protected features

**Expected Results**:
- Session persists across page refreshes
- User remains logged in during navigation
- Logout successfully clears session
- Protected features become inaccessible after logout

### Project Management Testing

#### Project Creation
**Test Case**: Create a new project successfully

**Steps**:
1. Log in to the application
2. Navigate to company dashboard
3. Click "Criar novo projeto" on any company card
4. Fill out the project form:
   - Project Name: "Test Project"
   - Start Date: Today's date
   - End Date: One month from today
   - Description: "This is a test project description"
   - Responsible: Select from dropdown
5. Click "Criar novo Projeto"

**Expected Results**:
- Modal opens with project form
- All fields are accessible and functional
- Form validates inputs correctly
- Success toast notification appears
- Project is added to the company
- Modal closes automatically

**Form Validation Testing**:
- **Empty Project Name**: Should show "O nome do projeto é obrigatório"
- **Short Project Name**: Should show "Mínimo de 3 caracteres"
- **No Start Date**: Should show "A data de início é obrigatória"
- **No End Date**: Should show "A data de fim é obrigatória"
- **End Date Before Start Date**: Should show date validation error
- **Empty Description**: Should show "A descrição é obrigatória"
- **Long Description**: Should show "Máximo de 500 caracteres"
- **No Responsible**: Should show "O responsável é obrigatório"

#### Project Display
**Test Case**: Verify projects display correctly

**Steps**:
1. Navigate to admin project page
2. Select a company with projects
3. Verify project information display

**Expected Results**:
- All projects for the company are displayed
- Project cards show correct information
- Charts render properly
- Status badges display correctly
- Manager information is visible

### User Interface Testing

#### Responsive Design
**Test Cases**: Verify application works on different screen sizes

**Desktop Testing (1920x1080)**:
- Company cards display in grid layout
- Navigation is fully visible
- Charts are properly sized
- All interactive elements are accessible

**Tablet Testing (768x1024)**:
- Cards adapt to smaller screen
- Navigation remains functional
- Touch targets are appropriate size
- Content remains readable

**Mobile Testing (375x667)**:
- Single column layout
- Hamburger menu functions correctly
- Forms are usable on small screen
- Charts scale appropriately

#### Accessibility Testing
**Test Cases**: Verify accessibility compliance

**Keyboard Navigation**:
1. Use only keyboard to navigate entire application
2. Tab through all interactive elements
3. Activate buttons using Enter key
4. Navigate forms using Tab/Shift+Tab
5. Close modals using Escape key

**Screen Reader Testing**:
1. Use screen reader software (NVDA, JAWS, or VoiceOver)
2. Verify all content is announced
3. Check form labels are associated
4. Confirm button purposes are clear
5. Verify status messages are announced

**Color Contrast Testing**:
1. Use browser developer tools
2. Check color contrast ratios
3. Verify text is readable
4. Test with color blindness simulators

### Data Visualization Testing

#### Chart Functionality
**Test Case**: Verify charts render and interact correctly

**Steps**:
1. Navigate to company dashboard
2. Observe progress charts on company cards
3. Hover over chart elements
4. Resize browser window
5. Navigate to project detail page
6. Verify individual project charts

**Expected Results**:
- Charts render without errors
- Tooltips appear on hover
- Charts resize with window
- Data is accurately represented
- Colors are consistent

#### Data Accuracy
**Test Case**: Verify mock data is reasonable and consistent

**Steps**:
1. Review multiple company cards
2. Check project counts match actual projects
3. Verify progress percentages make sense
4. Confirm dates are logical
5. Check status assignments are appropriate

**Expected Results**:
- Project counts are accurate
- Progress data is within reasonable ranges (0-100%)
- Dates follow logical patterns
- Status badges reflect realistic project states

### Performance Testing

#### Page Load Performance
**Test Case**: Measure application performance

**Steps**:
1. Open browser developer tools
2. Navigate to Performance tab
3. Record page load
4. Analyze loading times
5. Check for performance bottlenecks

**Acceptance Criteria**:
- Initial page load under 3 seconds
- Time to interactive under 5 seconds
- No long tasks blocking main thread
- Smooth animations and transitions

#### Memory Usage
**Test Case**: Monitor memory consumption

**Steps**:
1. Open Memory tab in developer tools
2. Take heap snapshot
3. Navigate through application
4. Create multiple projects
5. Take another heap snapshot
6. Check for memory leaks

**Expected Results**:
- Memory usage remains stable
- No significant memory leaks
- Garbage collection works properly

### Cross-Browser Testing

#### Browser Compatibility
**Test Matrix**:

| Browser | Version | Authentication | Project Creation | Charts | Responsive |
|---------|---------|---------------|------------------|--------|------------|
| Chrome  | 90+     | ✅             | ✅                | ✅      | ✅          |
| Firefox | 88+     | ✅             | ✅                | ✅      | ✅          |
| Safari  | 14+     | ✅             | ✅                | ✅      | ✅          |
| Edge    | 90+     | ✅             | ✅                | ✅      | ✅          |

**Test Procedure for Each Browser**:
1. Complete authentication flow
2. Create a new project
3. Verify charts display correctly
4. Test responsive breakpoints
5. Check form validation
6. Verify navigation works

## Automated Testing Recommendations

### Unit Testing Setup

#### Jest Configuration
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

#### Example Component Tests
```typescript
// __tests__/components/StatusProject.test.tsx
import { render, screen } from '@testing-library/react'
import { StatusProject } from '@/components/StatusProject'

describe('StatusProject', () => {
  it('renders active status correctly', () => {
    render(<StatusProject status="active" />)
    expect(screen.getByText('Ativo')).toBeInTheDocument()
    expect(screen.getByText('Ativo')).toHaveClass('text-blue-500')
  })

  it('renders late status correctly', () => {
    render(<StatusProject status="late" />)
    expect(screen.getByText('Atrasado')).toBeInTheDocument()
    expect(screen.getByText('Atrasado')).toHaveClass('text-red-500')
  })

  it('renders done status correctly', () => {
    render(<StatusProject status="done" />)
    expect(screen.getByText('Concluído')).toBeInTheDocument()
    expect(screen.getByText('Concluído')).toHaveClass('text-green-500')
  })

  it('handles invalid status', () => {
    render(<StatusProject status="invalid" />)
    expect(screen.getByText('Status inválido!')).toBeInTheDocument()
  })
})
```

#### Form Testing
```typescript
// __tests__/components/NewProjectModal.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewProjectModal } from '@/components/NewProjectModal'

describe('NewProjectModal', () => {
  it('validates required fields', async () => {
    render(<NewProjectModal id={1} />)
    
    const submitButton = screen.getByRole('button', { name: /criar novo projeto/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('O nome do projeto é obrigatório.')).toBeInTheDocument()
    })
  })

  it('validates date range', async () => {
    const user = userEvent.setup()
    render(<NewProjectModal id={1} />)
    
    const startDate = screen.getByLabelText(/data de início/i)
    const endDate = screen.getByLabelText(/data limite/i)
    
    await user.type(startDate, '2024-12-31')
    await user.type(endDate, '2024-01-01')
    
    const submitButton = screen.getByRole('button', { name: /criar novo projeto/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/a data de fim não pode ser anterior/i)).toBeInTheDocument()
    })
  })
})
```

### Integration Testing

#### API Testing
```typescript
// __tests__/api/auth.test.ts
import { NextAuthOptions } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

describe('Authentication Configuration', () => {
  it('has correct providers configured', () => {
    expect(authOptions.providers).toHaveLength(2)
    expect(authOptions.providers[0].name).toBe('Credentials')
    expect(authOptions.providers[1].id).toBe('github')
  })

  it('sets admin role in JWT callback', async () => {
    const token = {}
    const result = await authOptions.callbacks?.jwt?.({ token })
    expect(result.role).toBe('admin')
  })
})
```

#### Page Testing
```typescript
// __tests__/pages/home.test.tsx
import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import Home from '@/app/page'

const MockSessionProvider = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
)

describe('Home Page', () => {
  it('renders company dashboard', () => {
    render(
      <MockSessionProvider session={null}>
        <Home />
      </MockSessionProvider>
    )
    
    expect(screen.getAllByText(/company/i)).toHaveLength(5) // 5 mock companies
  })

  it('shows create project buttons when authenticated', () => {
    const mockSession = {
      user: { name: 'Test User', email: 'test@example.com' },
      expires: '2024-12-31'
    }
    
    render(
      <MockSessionProvider session={mockSession}>
        <Home />
      </MockSessionProvider>
    )
    
    expect(screen.getAllByText(/criar novo projeto/i)).toHaveLength(5)
  })
})
```

### End-to-End Testing

#### Playwright Setup
```javascript
// playwright.config.js
module.exports = {
  testDir: './e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
}
```

#### E2E Test Examples
```typescript
// e2e/authentication.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should login with credentials', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Log in')
    await page.fill('[name="username"]', 'Jonh')
    await page.fill('[name="password"]', 'nextauth')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=Bem vindo, Jonh')).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/')
    // ... login steps ...
    
    await page.click('[data-testid="user-menu"]')
    await page.click('text=Sair')
    
    await expect(page.locator('text=Log in')).toBeVisible()
  })
})
```

```typescript
// e2e/project-creation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Project Creation', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/')
    await page.click('text=Log in')
    await page.fill('[name="username"]', 'Jonh')
    await page.fill('[name="password"]', 'nextauth')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Bem vindo, Jonh')).toBeVisible()
  })

  test('should create a new project', async ({ page }) => {
    await page.click('text=Criar novo projeto')
    
    await page.fill('[name="projectName"]', 'E2E Test Project')
    await page.fill('[name="startDate"]', '2024-01-01')
    await page.fill('[name="endDate"]', '2024-12-31')
    await page.fill('[name="description"]', 'This is an E2E test project')
    await page.selectOption('[name="responsible"]', 'Ayrton Senna')
    
    await page.click('text=Criar novo Projeto')
    
    await expect(page.locator('text=Project created successfully')).toBeVisible()
  })
})
```

## Test Data Management

### Mock Data
The application uses generated mock data that provides:
- 5 companies with 5 projects each
- Realistic project names and descriptions
- Random but logical progress data
- Varied project statuses
- Consistent manager assignments

### Test User Accounts
**Credentials Provider**:
- Username: "Jonh"
- Password: "nextauth"
- Role: "admin"

**GitHub OAuth**:
- Use any valid GitHub account
- No special permissions required
- Automatic admin role assignment

## Quality Assurance Checklist

### Pre-Release Checklist
- [ ] All manual test cases pass
- [ ] Cross-browser compatibility verified
- [ ] Responsive design tested on multiple devices
- [ ] Accessibility requirements met
- [ ] Performance benchmarks achieved
- [ ] Security scan completed
- [ ] Error handling tested
- [ ] Form validation working correctly
- [ ] Authentication flows functional
- [ ] Charts and visualizations accurate
- [ ] Navigation and routing working
- [ ] Toast notifications appearing
- [ ] Loading states displaying correctly

### Performance Benchmarks
- **Page Load Time**: < 3 seconds
- **Time to Interactive**: < 5 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1

### Accessibility Standards
- **WCAG 2.1 AA Compliance**: All criteria met
- **Keyboard Navigation**: Full functionality
- **Screen Reader Support**: All content accessible
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Management**: Clear focus indicators

## Bug Reporting Template

### Bug Report Format
```
**Title**: Brief description of the issue

**Environment**:
- Browser: [Chrome/Firefox/Safari/Edge]
- Version: [Browser version]
- Device: [Desktop/Tablet/Mobile]
- Screen Resolution: [e.g., 1920x1080]

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Result**:
Description of what should happen

**Actual Result**:
Description of what actually happened

**Screenshots/Videos**:
[Attach visual evidence if applicable]

**Additional Information**:
Any other relevant details
```

### Severity Levels
- **Critical**: Application crashes or security issues
- **High**: Major functionality broken
- **Medium**: Minor functionality issues
- **Low**: Cosmetic or enhancement requests