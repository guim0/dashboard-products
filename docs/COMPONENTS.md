# Component Documentation

## Overview

This document provides detailed information about all components in the Dashboard Products application, their usage, props, and examples.

## UI Components (shadcn/ui)

### Card Components

#### Card
The main container component for displaying content with consistent styling.

```typescript
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

<Card className="min-w-[300px] max-w-[600px] w-full">
  <CardHeader>
    <CardTitle>Company Name</CardTitle>
    <CardDescription>Company description or metadata</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions or additional info */}
  </CardFooter>
</Card>
```

**Props:**
- Extends `HTMLDivElement` attributes
- `className`: Additional CSS classes

#### CardHeader
Container for card title and description.

#### CardTitle
Main heading for the card content.

#### CardDescription
Subtitle or description text with muted styling.

#### CardContent
Main content area with consistent padding.

#### CardFooter
Footer area for actions or additional information.

### Button Components

#### Button
Versatile button component with multiple variants.

```typescript
import { Button } from "@/components/ui/button";

<Button variant="default" size="default">
  Default Button
</Button>

<Button variant="destructive" size="sm">
  Delete
</Button>

<Button variant="outline" asChild>
  <Link href="/somewhere">Navigate</Link>
</Button>
```

**Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- `asChild`: Renders as child component (useful with Next.js Link)

### Dialog Components

#### AlertDialog
Modal dialog for important actions and confirmations.

```typescript
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger>
    <Button>Open Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Form Components

#### Input
Standard input field with consistent styling.

```typescript
import { Input } from "@/components/ui/input";

<Input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={onChange}
/>
```

#### Textarea
Multi-line text input component.

```typescript
import { Textarea } from "@/components/ui/textarea";

<Textarea
  placeholder="Enter description..."
  rows={4}
/>
```

#### Label
Form label component with proper accessibility.

```typescript
import { Label } from "@/components/ui/label";

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

#### Select
Dropdown select component with search and keyboard navigation.

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Feedback Components

#### Toast
Notification system for user feedback.

```typescript
import { useToast } from "@/components/ui/use-toast";

const { toast } = useToast();

toast({
  title: "Success!",
  description: "Your action was completed successfully.",
  variant: "default", // or "destructive"
});
```

#### Skeleton
Loading placeholder component.

```typescript
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-[20px] w-[20px] rounded" />
```

### Data Display Components

#### Badge
Status indicators and labels.

```typescript
import { Badge } from "@/components/ui/badge";

<Badge variant="default">Active</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

#### Avatar
User profile image component.

```typescript
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/user-image.jpg" alt="User" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

### Chart Components

#### ChartContainer
Wrapper for chart components with consistent theming.

```typescript
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

<ChartContainer config={chartConfig}>
  <BarChart data={data} layout="vertical">
    <XAxis type="number" dataKey="desktop" hide />
    <YAxis dataKey="month" type="category" />
    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
  </BarChart>
</ChartContainer>
```

## Feature Components

### Navigation Components

#### Navbar
Main navigation component with authentication integration.

```typescript
// components/Navbar.tsx
const Navbar = () => {
  const { data, status } = useSession();
  // Component logic
};
```

**Features:**
- User authentication status display
- Profile avatar for authenticated users
- Navigation menu with dropdown
- Responsive design with loading states

**States:**
- **Unauthenticated**: Shows login button
- **Loading**: Displays skeleton loaders
- **Authenticated**: Shows user info and navigation menu

### Project Management Components

#### NewProjectModal
Modal form for creating new projects.

```typescript
// components/NewProjectModal.tsx
export const NewProjectModal = ({ id }: { id: number }) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm<INewProjectForm>();
  // Component logic
};
```

**Props:**
- `id`: Company ID to add the project to

**Features:**
- Form validation with React Hook Form
- Date validation (end date after start date)
- Toast notifications for success/error
- Responsive form layout

**Form Fields:**
- Project name (required, min 3 characters)
- Start date (required)
- End date (required, must be after start date)
- Description (required, max 500 characters)
- Responsible person (required, select dropdown)

#### StatusProject
Project status badge component.

```typescript
// components/StatusProject.tsx
export const StatusProject = ({ status }: IStatusProject) => {
  // Status styling logic
};
```

**Props:**
- `status`: "active" | "late" | "done" | string

**Features:**
- Color-coded status indicators
- Hover effects
- Internationalized labels (Portuguese)
- Invalid status handling

**Status Styles:**
- **Active**: Blue color scheme
- **Late**: Red color scheme  
- **Done**: Green color scheme

### Utility Components

#### InputMoney
Currency input component with formatting.

```typescript
// components/InputMoney.tsx
const InputMoney = ({ ...rest }: CurrencyInputProps) => {
  return <CurrencyInput prefix="$" name="price" {...rest} />;
};
```

**Features:**
- Automatic currency formatting
- Dollar sign prefix
- Number input validation
- Integration with react-currency-input-field

## Layout Components

### Root Layout
Main application layout with providers and global styles.

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <main>
          <NextAuthProvider>
            <Navbar />
            <section className="grow bg-slate-950 h-dvh">{children}</section>
          </NextAuthProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
```

### Admin Layout
Protected layout for admin routes.

```typescript
// app/admin/layout.tsx
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/");
  }
  
  return <>{children}</>;
}
```

## Page Components

### Home Page (Company Dashboard)
Main dashboard displaying companies and their projects.

```typescript
// app/page.tsx
export default function ListingPage() {
  const { status } = useSession();
  const { toast } = useToast();
  const data = mockCompanies;
  // Component logic
};
```

**Features:**
- Company grid layout
- Project count display
- Progress charts for each company
- Create new project functionality (authenticated only)
- Responsive design

### Project Detail Page
Detailed view of projects for a specific company.

```typescript
// app/admin/project/[id]/page.tsx
export default function ProjectDetailPage({ params }: { params: { id: number } }) {
  // Component logic
};
```

**Features:**
- Dynamic routing with company ID
- Individual project cards
- Progress visualization
- Status indicators
- Manager information

## Component Patterns

### Compound Components
Many UI components use the compound component pattern:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Render Props
Some components accept render functions:

```typescript
<ChartContainer config={chartConfig}>
  {(chartProps) => <BarChart {...chartProps} />}
</ChartContainer>
```

### Forward Refs
UI components forward refs for better composability:

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn("btn-base", className)} {...props} />
  )
);
```

## Styling Patterns

### Class Name Utilities
Components use the `cn()` utility for conditional classes:

```typescript
import { cn } from "@/lib/utils";

className={cn("base-styles", conditionalClass && "extra-styles", className)}
```

### CSS Variables
Components use CSS variables for theming:

```css
.card {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
}
```

### Responsive Design
Components use Tailwind's responsive utilities:

```typescript
className="min-w-[300px] max-w-[600px] w-full md:w-1/2 lg:w-1/3"
```

## Accessibility Features

### Keyboard Navigation
- Focus management in modals
- Keyboard shortcuts for common actions
- Tab order preservation

### Screen Reader Support
- Proper ARIA labels
- Semantic HTML elements
- Alternative text for images

### Color Contrast
- High contrast color schemes
- Color-blind friendly palettes
- Focus indicators

## Performance Optimizations

### Component Memoization
```typescript
const MemoizedComponent = React.memo(({ data }) => {
  // Component logic
});
```

### Lazy Loading
```typescript
const LazyComponent = React.lazy(() => import('./HeavyComponent'));
```

### Code Splitting
Components are automatically split by Next.js routing.