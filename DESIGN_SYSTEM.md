# 🎨 Portfolio Design System - Complete Implementation Guide

## Overview

Sistem desain profesional untuk portfolio Rafi Hermawan yang menggabungkan **keahlian teknis IT** dengan **karakter kepemimpinan yang tegas, disiplin, dan profesional**.

---

## 📦 Directory Structure

```
src/
├── styles/
│   └── theme.js              # Theme configuration & color system
├── components/
│   ├── ui/                   # Reusable component library
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Typography.jsx
│   │   ├── Section.jsx
│   │   ├── ProjectCard.jsx
│   │   └── index.js          # Barrel export
│   ├── Navbar.jsx            # Refactored navbar
│   └── [other components...]
└── Pages/
    ├── Home.jsx
    ├── About.jsx
    ├── PortfolioRefactored.jsx  # New professional portfolio page
    └── Contact.jsx
```

---

## 🎯 Design System Principles

### 1. **PALET WARNA** (Professional & Authoritative)

#### Primary Colors

- **Slate-900 / Zinc-900**: Main text, dark elements
- **Slate-50 / Gray-50**: Clean page backgrounds
- **Blue-800 / Indigo-900**: Primary CTAs, highlights

#### Usage Example

```jsx
// Text
<Text color="slate-900">Primary text</Text>
<Text color="slate-600">Secondary text</Text>

// Background
<Section bgColor="bg-slate-50" />

// Accent
<Button variant="primary" />  // Blue-800
```

---

### 2. **TIPOGRAFI & WHITESPACE**

#### Typography Hierarchy

| Level | Size         | Weight | Usage           |
| ----- | ------------ | ------ | --------------- |
| H1    | text-4xl-6xl | bold   | Page titles     |
| H2    | text-3xl-4xl | bold   | Section headers |
| H3    | text-2xl-3xl | bold   | Subsections     |
| Body  | text-base    | normal | Content text    |
| Small | text-sm      | normal | Metadata        |

#### Spacing Rules

- **Padding**: `p-6`, `p-8` (never cramped)
- **Gap**: `gap-6`, `gap-8` (consistent rhythm)
- **Margin**: Larger than padding for breathing room

```jsx
// ✅ CORRECT
<Section py="lg" p="lg">
  <Container>
    <Heading>Title</Heading>
    <Stack gap="lg">
      {/* Content with ample space */}
    </Stack>
  </Container>
</Section>

// ❌ AVOID
<div className="p-1 gap-1">Cramped content</div>
```

---

### 3. **ELEMEN UI & INTERAKSI**

#### Card Styling

```jsx
// Default: Light, clean appearance
<Card variant="default" p="md" interactive>
  {/* Content */}
</Card>

// Elevated: With subtle shadow
<Card variant="elevated" p="lg" interactive>
  {/* Content */}
</Card>

// Outline: Bordered variation
<Card variant="outline" p="md">
  {/* Content */}
</Card>
```

#### Hover Effects

```
Default Shadow: shadow-sm
Hover State:
  - translate-y-(-1 unit)
  - shadow-lg
  - border-slate-300 (brightened)
Transition: duration-300 ease-in-out
```

#### Button Variants

```jsx
<Button variant="primary">Primary CTA</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

---

### 4. **RESPONSIVE DESIGN (Mobile-First)**

#### Breakpoint Strategy

```jsx
// Mobile first (default)
<div className="flex-col gap-4">

// Tablet up
<div className="flex-col gap-4 md:flex-row md:gap-6">

// Desktop up
<div className="flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
```

#### Grid Responsive

```jsx
<Grid
  cols={{
    mobile: 1, // 1 column on mobile
    tablet: 2, // 2 columns on tablet
    desktop: 3, // 3 columns on desktop
  }}
>
  {items}
</Grid>
```

---

## 💻 Component Usage Examples

### Button Component

```jsx
import { Button } from '@/components/ui';

// Basic
<Button>Click me</Button>

// With variant & size
<Button variant="primary" size="lg">
  Large Primary Button
</Button>

// As link
<Button href="https://example.com" target="_blank">
  External Link
</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// With icon
<Button>
  <Icon className="w-5 h-5" />
  With Icon
</Button>
```

### Card Component

```jsx
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui";

<Card interactive variant="elevated" p="lg">
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary" size="sm">
      Action
    </Button>
  </CardFooter>
</Card>;
```

### Typography

```jsx
import { Heading, Text, Lead, Quote } from '@/components/ui';

<Heading as="h1">Main Title</Heading>
<Heading as="h2">Section Header</Heading>

<Text>Regular paragraph text</Text>
<Text size="lg" weight="semibold">Emphasized text</Text>
<Text muted>Muted/secondary text</Text>

<Lead>Large introductory text</Lead>
<Quote author="Someone">A meaningful quote</Quote>
```

### Badge

```jsx
import { Badge, BadgeGroup } from "@/components/ui";

<BadgeGroup>
  <Badge variant="primary">JavaScript</Badge>
  <Badge variant="secondary">React</Badge>
  <Badge variant="success">Completed</Badge>
  <Badge variant="warning">In Progress</Badge>
</BadgeGroup>;
```

### Section & Layout

```jsx
import { Section, Container, Grid, Stack } from "@/components/ui";

<Section id="about" bgColor="bg-white" py="xl">
  <Container size="lg">
    <Heading as="h2">About Section</Heading>

    <Stack direction="horizontal" gap="lg" align="center">
      <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
        {/* Grid items */}
      </Grid>
    </Stack>
  </Container>
</Section>;
```

---

## 🔄 Refactoring Existing Components

### Before (Old Style)

```jsx
<div className="bg-[#030014] text-white px-4 py-8">
  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
    Portfolio
  </h2>
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    {projects.map((p) => (
      <div className="border border-white/10 p-4 hover:bg-white/10 transition-colors">
        {/* Project content */}
      </div>
    ))}
  </div>
</div>
```

### After (Design System)

```jsx
<Section bgColor="bg-white" py="lg">
  <Container>
    <Heading as="h2">Portfolio</Heading>

    <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} className="gap-6 mt-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          techStack={project.techStack}
          link={project.link}
          features={project.features}
        />
      ))}
    </Grid>
  </Container>
</Section>
```

---

## 🎯 Best Practices

### ✅ DO:

- Use design system components first (Button, Card, etc.)
- Maintain consistent spacing (p-6, p-8, gap-6, gap-8)
- Apply hover effects to all interactive elements
- Keep mobile layout in mind (mobile-first)
- Use Typography components for all text
- Implement smooth transitions (duration-300)

### ❌ DON'T:

- Create inline custom colors, use theme.js values
- Use arbitrary spacing (p-3, p-7, etc.)
- Forget responsive breakpoints (md:, lg:)
- Apply heavy drop shadows without purpose
- Mix old design patterns with new system
- Use dark colors directly (#030014, #a855f7)

---

## 🚀 Migration Checklist

- [ ] Replace all color codes with Design System values
- [ ] Import components from `@/components/ui`
- [ ] Update Navbar to use new palette
- [ ] Refactor all pages to use Section/Container/Grid
- [ ] Replace inline cards with Card component
- [ ] Update buttons to use Button component
- [ ] Ensure mobile responsiveness with md: & lg:
- [ ] Remove unused gradient overlays
- [ ] Standardize spacing throughout
- [ ] Test on mobile, tablet, desktop

---

## 📚 Import Shortcuts

```jsx
// Theme values
import { colors, spacing, typography, transitions } from "@/styles/theme";

// All UI components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  BadgeGroup,
  Heading,
  Text,
  Lead,
  Quote,
  Section,
  Container,
  Grid,
  Stack,
} from "@/components/ui";

// Specialized cards
import { ProjectCard, CertificateCard } from "@/components/ui/ProjectCard";
```

---

## 📞 Support

For design system questions or issues, refer to:

- `src/styles/theme.js` - Color & spacing definitions
- `src/components/ui/` - Component source code
- Component usage examples above

**Remember**: Consistency creates professionalism. When in doubt, follow the Design System.
