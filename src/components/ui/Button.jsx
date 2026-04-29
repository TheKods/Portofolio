import React from "react";
import {
  transitions,
  colors,
  spacing,
  hoverEffects,
  cn,
} from "../styles/theme";

/**
 * Button Component - Flexible, Professional Design System Button
 *
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} isLoading - Show loading state
 * @param {string} className - Additional Tailwind classes
 * @param {ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {string} href - Link href (renders as <a> tag)
 * @param {boolean} fullWidth - Full width button
 */
export const Button = React.forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      className = "",
      children,
      onClick,
      href,
      fullWidth = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    // Base styles
    const baseStyles = `
    font-semibold rounded-lg
    ${transitions.default}
    inline-flex items-center justify-center gap-2
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
  `;

    // Size variants
    const sizeStyles = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    };

    // Variant styles
    const variantStyles = {
      primary: `
      bg-blue-800 text-white
      border border-blue-900
      hover:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5
      active:translate-y-0
    `,
      secondary: `
      bg-slate-200 text-slate-900
      border border-slate-300
      hover:bg-slate-300 hover:shadow-md hover:-translate-y-0.5
      active:translate-y-0
    `,
      outline: `
      bg-transparent text-blue-800
      border border-blue-800
      hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5
      active:translate-y-0
    `,
      ghost: `
      bg-transparent text-slate-900
      border border-transparent
      hover:bg-slate-100 hover:-translate-y-0.5
      active:translate-y-0
    `,
    };

    const buttonClasses = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className,
    );

    // Render as anchor tag if href is provided
    if (href) {
      return (
        <a href={href} className="no-underline" {...props}>
          <button
            ref={ref}
            className={buttonClasses}
            disabled={disabled || isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Loading...
              </>
            ) : (
              children
            )}
          </button>
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
