import React from "react";
import { transitions, spacing, hoverEffects, cn } from "../../lib/theme";

/**
 * Card Component - Flexible container with professional styling
 *
 * @param {string} className - Additional Tailwind classes
 * @param {ReactNode} children - Card content
 * @param {boolean} interactive - Apply hover effects (lift, shadow)
 * @param {string} variant - 'default' | 'elevated' | 'outline'
 * @param {string} p - Padding preset ('xs' | 'sm' | 'md' | 'lg' | 'xl')
 */
export const Card = React.forwardRef(
  (
    {
      className = "",
      children,
      interactive = false,
      variant = "default",
      p = "md",
    },
    ref,
  ) => {
    const paddingMap = {
      xs: "p-2",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    const variantStyles = {
      default: `
      bg-white border border-slate-200
      ${interactive ? `${transitions.default} ${hoverEffects.lift}` : ""}
    `,
      elevated: `
      bg-white border border-slate-200 shadow-md
      ${interactive ? `${transitions.default} hover:shadow-lg hover:-translate-y-1` : ""}
    `,
      outline: `
      bg-slate-50 border-2 border-slate-300
      ${interactive ? `${transitions.default} ${hoverEffects.lift}` : ""}
    `,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg",
          paddingMap[p],
          variantStyles[variant],
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

/**
 * CardHeader - Card header section
 */
export const CardHeader = ({ className = "", children }) => (
  <div className={cn("mb-4 pb-4 border-b border-slate-200", className)}>
    {children}
  </div>
);

/**
 * CardBody - Card body section
 */
export const CardBody = ({ className = "", children }) => (
  <div className={cn("", className)}>{children}</div>
);

/**
 * CardFooter - Card footer section
 */
export const CardFooter = ({ className = "", children }) => (
  <div className={cn("mt-4 pt-4 border-t border-slate-200", className)}>
    {children}
  </div>
);
