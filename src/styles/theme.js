/**
 * Design System Theme Configuration
 * Professional & Leadership-focused color palette
 */

export const colors = {
  // Neutral Colors - Professional Foundation
  text: {
    primary: "slate-900", // Main text
    secondary: "slate-600", // Secondary text
    light: "slate-500", // Light text
    muted: "slate-400", // Muted text
  },

  background: {
    page: "slate-50", // Main page background
    secondary: "gray-50", // Alternative background
    card: "white", // Card background
    hover: "gray-100", // Hover state
  },

  accent: {
    primary: "blue-800", // Primary action
    secondary: "indigo-900", // Secondary action
    light: "blue-100", // Light accent
    lighter: "blue-50", // Very light accent
  },

  border: {
    light: "slate-200", // Light border
    default: "slate-300", // Default border
    dark: "slate-600", // Dark border
  },

  shadow: {
    sm: "shadow-sm", // Small shadow (default)
    md: "shadow-md", // Medium shadow
    lg: "shadow-lg", // Large shadow
  },
};

export const spacing = {
  // Consistent spacing values
  xs: "p-2",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
  "2xl": "p-12",

  // Gap values
  gap: {
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-10",
  },
};

export const typography = {
  // Heading Styles
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  h2: "text-3xl md:text-4xl font-bold tracking-tight",
  h3: "text-2xl md:text-3xl font-bold tracking-tight",
  h4: "text-xl md:text-2xl font-semibold",
  h5: "text-lg md:text-xl font-semibold",
  h6: "text-base md:text-lg font-semibold",

  // Body Styles
  body: "text-base leading-relaxed",
  bodySmall: "text-sm leading-relaxed",
  bodySm: "text-xs md:text-sm",
};

export const transitions = {
  // Smooth transitions
  default: "transition-all duration-300 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
  fast: "transition-all duration-200 ease-in-out",
};

export const hoverEffects = {
  // Standard hover effect for interactive elements
  lift: "hover:-translate-y-1 hover:shadow-lg hover:border-slate-300",
  brightBorder: "hover:border-slate-300",
  shadow: "hover:shadow-lg",
};

/**
 * Utility function to build Tailwind class strings
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
