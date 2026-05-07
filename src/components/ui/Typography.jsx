import React from "react";
import { cn } from "../../lib/theme";

/**
 * Typography Components - Professional text hierarchy
 */

export const Heading = React.forwardRef(
  (
    {
      as = "h1",
      children,
      className = "",
      color = "slate-900",
      align = "left",
    },
    ref,
  ) => {
    const levelMap = {
      h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
      h2: "text-3xl md:text-4xl font-bold tracking-tight",
      h3: "text-2xl md:text-3xl font-bold tracking-tight",
      h4: "text-xl md:text-2xl font-semibold",
      h5: "text-lg md:text-xl font-semibold",
      h6: "text-base md:text-lg font-semibold",
    };

    const colorMap = {
      "slate-900": "text-slate-900",
      "slate-800": "text-slate-800",
      "blue-800": "text-blue-800",
      "indigo-900": "text-indigo-900",
      white: "text-white",
    };

    const alignMap = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const Component = as;

    return (
      <Component
        ref={ref}
        className={cn(
          levelMap[as],
          colorMap[color] || "text-slate-900",
          alignMap[align],
          className,
        )}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = "Heading";

/**
 * Text Component - Body text with hierarchy support
 */
export const Text = React.forwardRef(
  (
    {
      children,
      className = "",
      color = "slate-600",
      size = "base",
      weight = "normal",
      align = "left",
      muted = false,
    },
    ref,
  ) => {
    const sizeMap = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    const weightMap = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const alignMap = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };

    const colorMap = {
      "slate-900": "text-slate-900",
      "slate-800": "text-slate-800",
      "slate-600": "text-slate-600",
      "slate-500": "text-slate-500",
      "slate-400": "text-slate-400",
      "blue-800": "text-blue-800",
      "indigo-900": "text-indigo-900",
      white: "text-white",
    };

    const finalColor = muted
      ? "text-slate-500"
      : colorMap[color] || "text-slate-600";

    return (
      <p
        ref={ref}
        className={cn(
          "leading-relaxed",
          sizeMap[size],
          weightMap[weight],
          alignMap[align],
          finalColor,
          className,
        )}
      >
        {children}
      </p>
    );
  },
);

Text.displayName = "Text";

/**
 * Small Text Component
 */
export const Small = ({ children, className = "", muted = false }) => (
  <span className={cn("text-sm", muted && "text-slate-500", className)}>
    {children}
  </span>
);

/**
 * Lead Text - Larger body text for introductions
 */
export const Lead = ({ children, className = "" }) => (
  <p className={cn("text-lg text-slate-600 leading-relaxed", className)}>
    {children}
  </p>
);

/**
 * Quote Component
 */
export const Quote = ({ children, author, className = "" }) => (
  <blockquote
    className={cn(
      "border-l-4 border-blue-800 pl-4 py-2 italic text-slate-600",
      className,
    )}
  >
    <p>{children}</p>
    {author && (
      <footer className="mt-2 text-sm font-medium text-slate-500">
        — {author}
      </footer>
    )}
  </blockquote>
);
