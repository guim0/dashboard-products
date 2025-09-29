# User Guide

## Overview

Dashboard Products is a comprehensive project management system that allows you to track projects across multiple companies with beautiful visualizations and intuitive interfaces.

## Getting Started

### 1. Accessing the Application

Navigate to the application URL in your web browser. You'll see the main dashboard with a dark theme interface.

### 2. Authentication

#### Signing In
1. Click the **"Log in"** button in the top navigation
2. Choose your authentication method:
   - **GitHub OAuth**: Sign in with your GitHub account (recommended)
   - **Credentials**: Use the demo account (username: "Jonh", password: "nextauth")

#### First Time Setup
- If using GitHub OAuth, you'll be redirected to GitHub for authorization
- Grant permission to the application
- You'll be redirected back to the dashboard with full access

### 3. Navigation

Once authenticated, you'll have access to:
- **Main Dashboard**: Overview of all companies and projects
- **Navigation Menu**: Access through the hamburger menu (☰) in the top right
- **User Profile**: Your avatar and name appear in the top navigation

## Main Features

### Company Dashboard

The main dashboard displays all companies in a card-based layout:

#### Company Cards
Each card shows:
- **Company Name**: The name of the company
- **Project Count**: Number of projects for this company
- **Progress Chart**: Visual representation of project progress
- **Actions**: Create new projects (authenticated users only)

#### Progress Visualization
- **Horizontal Bar Charts**: Monthly progress data
- **Interactive Tooltips**: Hover over chart elements for detailed information
- **Responsive Design**: Charts adapt to different screen sizes

### Project Management

#### Creating New Projects

1. **Access Project Creation**:
   - Must be authenticated (logged in)
   - Click **"Criar novo projeto"** (Create New Project) button on any company card

2. **Fill Project Information**:
   - **Project Name**: Enter a descriptive name (minimum 3 characters)
   - **Start Date**: Select the project start date
   - **End Date**: Select the end date (must be after start date)
   - **Description**: Provide a detailed description (maximum 500 characters)
   - **Responsible Person**: Select the project manager from dropdown

3. **Form Validation**:
   - All fields are required
   - Real-time validation with error messages
   - Date validation ensures logical project timeline

4. **Submit Project**:
   - Click **"Criar novo Projeto"** (Create New Project)
   - Success notification will appear
   - Project is immediately added to the company

#### Project Status Tracking

Projects have three status types:
- **🔵 Ativo (Active)**: Currently in progress
- **🔴 Atrasado (Late)**: Behind schedule
- **🟢 Concluído (Done)**: Completed

### Project Details

#### Viewing Project Details
1. Navigate to the admin area through the navigation menu
2. Select a company to view its projects
3. Each project card displays:
   - Project name and description
   - Manager information
   - Current status badge
   - Progress charts
   - Timeline information

#### Project Information Display
- **Manager Details**: Who is responsible for the project
- **Progress Metrics**: Visual charts showing monthly progress
- **Status Indicators**: Color-coded status badges
- **Timeline**: Start and end dates

## Interface Elements

### Navigation Bar

#### Unauthenticated State
- Application title: "Gerenciamento de projetos"
- Login button on the right

#### Authenticated State
- Welcome message with user name: "Bem vindo, [Username]"
- User avatar image
- Hamburger menu button (☰)

#### Navigation Menu Options
- **Visão Geral**: Return to main dashboard
- **Sair**: Sign out of the application

### Form Elements

#### Input Fields
- **Text Inputs**: Standard text entry with focus states
- **Date Pickers**: Calendar widgets for date selection
- **Text Areas**: Multi-line text input for descriptions
- **Select Dropdowns**: Searchable dropdown menus

#### Validation Messages
- **Required Fields**: Red error messages for missing information
- **Format Validation**: Specific error messages for format issues
- **Real-time Feedback**: Immediate validation as you type

### Visual Feedback

#### Toast Notifications
Appear in the top-right corner for:
- **Success Messages**: Green background for successful actions
- **Error Messages**: Red background for failed actions
- **Information**: Blue background for general information

#### Loading States
- **Skeleton Loaders**: Animated placeholders while loading
- **Button States**: Disabled states during form submission
- **Progressive Loading**: Content appears as it becomes available

## Charts and Data Visualization

### Progress Charts

#### Chart Types
- **Horizontal Bar Charts**: Main visualization method
- **Monthly Data**: 12 months of progress data
- **Dual Metrics**: Desktop and mobile progress tracking

#### Chart Features
- **Interactive Tooltips**: Hover for detailed information
- **Responsive Design**: Adapts to screen size
- **Color Coding**: Consistent color scheme
- **Animation**: Smooth transitions and loading

#### Data Interpretation
- **Progress Percentage**: Calculated from monthly metrics
- **Trend Analysis**: Visual pattern recognition
- **Comparative View**: Compare projects within a company

### Status Indicators

#### Status Badges
- **Visual Design**: Rounded badges with contrasting colors
- **Hover Effects**: Enhanced interactivity
- **Accessibility**: High contrast for readability

#### Color Coding
- **Blue (Ativo)**: Active projects in progress
- **Red (Atrasado)**: Projects behind schedule
- **Green (Concluído)**: Successfully completed projects

## Responsive Design

### Desktop Experience
- **Grid Layout**: Multi-column card display
- **Full Navigation**: Complete menu and options
- **Detailed Charts**: Full-size data visualizations
- **Hover Effects**: Enhanced interactivity

### Tablet Experience
- **Adaptive Grid**: Fewer columns, larger cards
- **Touch-Friendly**: Larger button targets
- **Collapsible Menus**: Space-efficient navigation

### Mobile Experience
- **Single Column**: Stacked card layout
- **Touch Navigation**: Optimized for finger interaction
- **Simplified Charts**: Readable on small screens
- **Hamburger Menu**: Space-efficient navigation

## Keyboard Navigation

### General Navigation
- **Tab**: Move between interactive elements
- **Enter**: Activate buttons and links
- **Escape**: Close modals and dropdowns

### Form Navigation
- **Tab/Shift+Tab**: Navigate between form fields
- **Arrow Keys**: Navigate select dropdowns
- **Enter**: Submit forms (when focused on submit button)

### Menu Navigation
- **Arrow Keys**: Navigate menu items
- **Enter**: Select menu option
- **Escape**: Close menu

## Accessibility Features

### Screen Reader Support
- **Alt Text**: All images have descriptive alt text
- **ARIA Labels**: Interactive elements properly labeled
- **Semantic HTML**: Proper heading structure and landmarks

### Visual Accessibility
- **High Contrast**: Strong color contrast ratios
- **Focus Indicators**: Clear focus outlines
- **Color Independence**: Information not conveyed by color alone

### Motor Accessibility
- **Large Touch Targets**: Buttons sized for easy interaction
- **Keyboard Navigation**: Full functionality without mouse
- **Error Prevention**: Clear validation and confirmation

## Data Management

### Mock Data System
The application uses a sophisticated mock data system that:
- **Generates Realistic Data**: Random but logical project information
- **Maintains Relationships**: Companies have multiple related projects
- **Provides Consistency**: Data persists during the session
- **Supports CRUD Operations**: Create, read, update functionality

### Data Persistence
- **Session Storage**: Data persists while the application is open
- **Form State**: Maintains form data during validation
- **Authentication State**: Remembers login status

## Troubleshooting

### Common Issues

#### Authentication Problems
- **GitHub OAuth Fails**: Check internet connection and try again
- **Credentials Don't Work**: Use "Jonh" and "nextauth" exactly
- **Session Expires**: Simply log in again

#### Display Issues
- **Charts Don't Load**: Refresh the page
- **Layout Problems**: Check screen zoom level
- **Slow Performance**: Close other browser tabs

#### Form Issues
- **Validation Errors**: Read error messages carefully
- **Date Problems**: Ensure end date is after start date
- **Submit Fails**: Check all required fields are filled

### Getting Help

#### Error Messages
- Read error messages carefully
- Check form validation messages
- Look for toast notifications

#### Browser Console
- Open developer tools (F12)
- Check console for error messages
- Report persistent errors

### Browser Compatibility

#### Supported Browsers
- **Chrome**: Version 90+
- **Firefox**: Version 88+
- **Safari**: Version 14+
- **Edge**: Version 90+

#### Features by Browser
- **All Modern Features**: Available in all supported browsers
- **Optimal Experience**: Chrome and Edge provide best performance
- **Progressive Enhancement**: Basic functionality works everywhere

## Best Practices

### Using the Application

#### Project Organization
- **Descriptive Names**: Use clear, specific project names
- **Detailed Descriptions**: Provide comprehensive project descriptions
- **Accurate Dates**: Set realistic start and end dates
- **Regular Updates**: Keep project status current

#### Data Management
- **Regular Reviews**: Check project status regularly
- **Consistent Naming**: Use consistent naming conventions
- **Complete Information**: Fill all available fields

### Security Practices

#### Account Security
- **Strong Passwords**: Use secure GitHub account passwords
- **Regular Logout**: Log out when finished
- **Shared Computers**: Always log out on shared devices

#### Data Privacy
- **Sensitive Information**: Don't include confidential data in descriptions
- **Public Access**: Remember that demo data is not private
- **Screen Sharing**: Be mindful when sharing screen during meetings

## Tips and Tricks

### Productivity Tips
- **Keyboard Shortcuts**: Use Tab for faster navigation
- **Bulk Operations**: Plan multiple projects before creating them
- **Status Monitoring**: Use status colors for quick project assessment

### Visual Tips
- **Chart Reading**: Focus on trend patterns rather than individual data points
- **Status Colors**: Learn the color coding for faster recognition
- **Responsive View**: Rotate mobile device for better chart viewing

### Navigation Tips
- **Breadcrumbs**: Use browser back button to return to previous view
- **Menu Memory**: Navigation menu remembers your preferred options
- **Quick Access**: Bookmark the main dashboard for direct access