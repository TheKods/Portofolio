import React from "react";
import { cn } from "../styles/theme";

/**
 * Badge Component - Label/tag for categorization
 *
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {ReactNode} children - Badge content
 * @param {string} className - Additional classes
 */
export const Badge = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  icon: Icon = null,
}) => {
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variantStyles = {
    primary: "bg-blue-100 text-blue-800 border border-blue-200",
    secondary: "bg-slate-100 text-slate-800 border border-slate-200",
    outline: "bg-transparent text-blue-800 border border-blue-800",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-amber-100 text-amber-800 border border-amber-200",
    error: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </span>
  );
};

/**
 * BadgeGroup - Group of badges
 */
export const BadgeGroup = ({
  children,
  className = "",
  direction = "horizontal",
}) => (
  <div
    className={cn(
      "flex flex-wrap gap-2",
      direction === "vertical" && "flex-col",
      className,
    )}
  >
    {children}
  </div>
);
