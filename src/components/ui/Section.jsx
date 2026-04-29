import React from "react";
import { cn } from "../styles/theme";

/**
 * Section Component - Main page section wrapper
 * Handles layout, spacing, and responsive behavior
 *
 * @param {string} id - Section ID for navigation
 * @param {ReactNode} children - Section content
 * @param {boolean} fullWidth - Ignore max-width constraint
 * @param {string} bgColor - Background color (default: slate-50)
 * @param {string} className - Additional classes
 * @param {string} py - Vertical padding preset ('sm' | 'md' | 'lg' | 'xl')
 */
export const Section = React.forwardRef(
  (
    {
      id,
      children,
      className = "",
      fullWidth = false,
      bgColor = "bg-slate-50",
      py = "lg",
    },
    ref,
  ) => {
    const pyMap = {
      sm: "py-6 md:py-8",
      md: "py-8 md:py-12",
      lg: "py-12 md:py-16",
      xl: "py-16 md:py-24",
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          bgColor,
          pyMap[py],
          !fullWidth && "px-4 md:px-8 lg:px-12",
          className,
        )}
      >
        {!fullWidth ? (
          <div className="max-w-7xl mx-auto">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  },
);

Section.displayName = "Section";

/**
 * Container - Flexible content container
 */
export const Container = React.forwardRef(
  ({ children, className = "", size = "md" }, ref) => {
    const sizeMap = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "w-full",
    };

    return (
      <div
        ref={ref}
        className={cn("mx-auto px-4 md:px-8", sizeMap[size], className)}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

/**
 * Grid - Responsive grid layout
 */
export const Grid = ({
  children,
  className = "",
  cols = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
}) => {
  const colClasses = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  const desktopCols = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-6",
        `grid-cols-${cols.mobile}`,
        colClasses[cols.tablet],
        desktopCols[cols.desktop],
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * Stack - Flex layout for vertical or horizontal stacking
 */
export const Stack = ({
  children,
  className = "",
  direction = "vertical",
  gap = "md",
  align = "start",
  justify = "start",
}) => {
  const gapMap = {
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-10",
  };

  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        className,
      )}
    >
      {children}
    </div>
  );
};
