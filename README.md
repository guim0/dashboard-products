# 📊 Dashboard Products - Project Management System

A modern, responsive project management dashboard built with Next.js 14, TypeScript, and shadcn/ui. This application provides comprehensive project tracking capabilities with beautiful data visualizations and seamless authentication.

## 🌟 Features

### 🔐 Authentication & Authorization
- **GitHub OAuth Integration** - Secure login with GitHub accounts
- **NextAuth.js** - Industry-standard authentication
- **Role-based Access Control** - Admin routes protection
- **Session Management** - Persistent login sessions

### 📈 Project Management
- **Company Dashboard** - Overview of all companies and their projects
- **Project Creation** - Create new projects with detailed information
- **Progress Tracking** - Visual progress charts for each project
- **Status Management** - Track project status (Active, Late, Done)
- **Data Visualization** - Interactive charts using Recharts

### 🎨 Modern UI/UX
- **shadcn/ui Components** - Beautiful, accessible UI components
- **Responsive Design** - Mobile-first responsive layout
- **Dark Theme** - Sleek dark interface
- **Toast Notifications** - User feedback system
- **Loading States** - Skeleton loaders for better UX

### 📊 Data Management
- **Mock Data System** - Realistic project data generation
- **Form Validation** - React Hook Form with validation
- **Real-time Updates** - Dynamic data updates

## 🛠 Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern component library

### UI Components & Libraries
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Recharts](https://recharts.org/)** - Data visualization library
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[class-variance-authority](https://cva.style/)** - Component variants

### Authentication & State
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication framework
- **[React Currency Input](https://github.com/cchanxzy/react-currency-input-field)** - Currency input handling

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **GitHub Account** (for OAuth setup)

### 1. Clone the Repository
```bash
git clone https://github.com/guim0/dashboard-products.git
cd dashboard-products
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

#### Generate NextAuth Secret
```bash
openssl rand -base64 32
```

#### Create `.env.local` file
```env
# NextAuth Configuration
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (see setup guide below)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

#### GitHub OAuth Setup
1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the following:
   - **Application name**: `dashboard-products-local`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy the **Client ID** and **Client Secret** to your `.env.local` file

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dashboard-products/
├── app/                          # Next.js App Router
│   ├── admin/                    # Protected admin routes
│   │   ├── layout.tsx           # Admin layout with auth protection
│   │   └── project/[id]/        # Dynamic project detail pages
│   ├── api/                     # API routes
│   │   └── auth/[...nextauth]/  # NextAuth configuration
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page (company dashboard)
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── card.tsx             # Card component
│   │   ├── button.tsx           # Button variations
│   │   ├── toast.tsx            # Toast notifications
│   │   └── ...                  # Other UI primitives
│   ├── InputMoney.tsx           # Currency input component
│   ├── Navbar.tsx               # Navigation component
│   ├── NewProjectModal.tsx      # Project creation modal
│   └── StatusProject.tsx        # Project status badge
├── lib/                         # Utility libraries
│   ├── mocked/                  # Mock data system
│   │   └── list.ts              # Companies and projects data
│   ├── utils/                   # Utility functions
│   │   └── chartConfigOnCard.tsx # Chart configuration
│   └── utils.ts                 # Common utilities (cn, etc.)
├── provider/                    # React providers
│   └── nextProvider.tsx         # NextAuth session provider
├── public/                      # Static assets
│   ├── burger-menu.svg          # Menu icon
│   ├── github.svg               # GitHub icon
│   └── ...                      # Other icons
├── middleware.ts                # Next.js middleware for auth
├── tailwind.config.ts           # Tailwind configuration
├── components.json              # shadcn/ui configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔧 Configuration Files

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tailwind Configuration (`tailwind.config.ts`)
The project uses a comprehensive Tailwind setup with:
- Custom color variables for theming
- CSS variable-based color system
- shadcn/ui integration
- Animation utilities

## 📱 Features Deep Dive

### 🏢 Company Dashboard
The main dashboard displays:
- **Company Cards** - Each company with project count
- **Progress Charts** - Monthly progress visualization
- **Quick Actions** - Create new projects (authenticated users only)
- **Responsive Grid** - Adaptive layout for all screen sizes

### 📊 Project Management
Projects include:
- **Basic Information** - Name, description, dates
- **Progress Tracking** - Monthly desktop/mobile metrics
- **Status Indicators** - Visual status badges
- **Manager Assignment** - Project responsibility tracking

### 🎨 UI Components

#### Cards
- Consistent styling with shadcn/ui
- Responsive design
- Loading states with skeleton components

#### Forms
- React Hook Form integration
- Real-time validation
- Error handling and display
- Date validation (end date after start date)

#### Charts
- Recharts integration
- Horizontal bar charts
- Responsive design
- Tooltip interactions

#### Status Badges
- Color-coded status indicators
- Hover effects
- Internationalized labels (Portuguese)

### 🔐 Authentication Flow

1. **Unauthenticated State**
   - Display login button
   - Show public content only
   - Restrict project creation

2. **Authentication Process**
   - GitHub OAuth redirect
   - NextAuth session creation
   - Role assignment (admin)

3. **Authenticated State**
   - User avatar and name display
   - Access to project creation
   - Navigation menu access

### 📊 Data Architecture

#### Mock Data System
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
    status: "active" | "late" | "done";
    progress_percentage: number;
  };
  description: string;
}

interface ICompany {
  id: number;
  company_name: string;
  projects: IProject[];
}
```

## 🛠 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style
- **TypeScript** - Strict type checking enabled
- **ESLint** - Next.js recommended configuration
- **Prettier** - Code formatting (if configured)

### Component Development
```typescript
// Example component structure
import { ComponentProps } from "@/types";
import { cn } from "@/lib/utils";

export const MyComponent = ({ className, ...props }: ComponentProps) => {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {/* Component content */}
    </div>
  );
};
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Update `NEXTAUTH_URL` to your production domain
4. Update GitHub OAuth app with production URLs

### Environment Variables for Production
```env
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.vercel.app"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### Build Optimization
- Automatic static optimization
- Image optimization with Next.js
- Tree shaking for smaller bundles
- CSS optimization with Tailwind

## 🔍 Troubleshooting

### Common Issues

#### Build Errors
- **Font Loading Issues**: Ensure Google Fonts are accessible or use local fonts
- **Type Errors**: Check TypeScript configuration and imports

#### Authentication Issues
- **GitHub OAuth**: Verify client ID and secret
- **Callback URL**: Ensure exact match with GitHub app settings
- **NEXTAUTH_SECRET**: Must be set in production

#### Development Issues
- **Port Conflicts**: Change port with `npm run dev -- -p 3001`
- **Cache Issues**: Clear `.next` folder and restart

### Environment Setup Verification
```bash
# Check Node.js version
node --version  # Should be v18+

# Verify environment variables
echo $GITHUB_ID  # Should show your client ID

# Test build
npm run build
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Guidelines
- Follow TypeScript best practices
- Use shadcn/ui components when possible
- Maintain responsive design
- Add proper error handling
- Include loading states

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Developer**: Guilherme (guim0)
- **LinkedIn**: [guim0-dev](https://www.linkedin.com/in/guim0-dev)
- **Email**: guimodev@gmail.com
- **GitHub**: [guim0](https://github.com/guim0)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Next.js](https://nextjs.org/) team for the excellent framework
- [Vercel](https://vercel.com/) for hosting and deployment tools

---

**Built with ❤️ using Next.js and modern web technologies**
