import React, { memo } from 'react';
import { Loader2, Code2, Sparkles } from 'lucide-react';

// Simple Loading Spinner
export const LoadingSpinner = memo(({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin text-blue-400 ${sizeClasses[size]}`} />
    </div>
  );
});

// Page Loading Component
export const PageLoader = memo(({ message = 'Loading...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-transparent">
    <div className="text-center space-y-4">
      {/* Animated Logo/Icon */}
      <div className="relative">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
            <Code2 className="w-8 h-8 text-white animate-bounce" />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute -top-1 -right-3 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-40" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -bottom-1 -left-4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{message}</h3>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
));

// Skeleton Loading Components
export const SkeletonCard = memo(({ className = '' }) => (
  <div className={`bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 animate-pulse ${className}`}>
    <div className="space-y-4">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-32 bg-gray-700 rounded"></div>
      <div className="flex space-x-2">
        <div className="h-6 bg-gray-700 rounded w-16"></div>
        <div className="h-6 bg-gray-700 rounded w-20"></div>
        <div className="h-6 bg-gray-700 rounded w-14"></div>
      </div>
    </div>
  </div>
));

export const SkeletonText = memo(({ lines = 3, className = '' }) => (
  <div className={`space-y-2 animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-700 rounded ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
));

// Progress Bar Component
export const ProgressBar = memo(({ progress = 0, className = '' }) => (
  <div className={`w-full bg-gray-700 rounded-full h-2 overflow-hidden ${className}`}>
    <div
      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    />
  </div>
));

// Typing Indicator Component
export const TypingIndicator = memo(({ className = '' }) => (
  <div className={`flex items-center space-x-1 ${className}`}>
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
    <span className="text-sm text-gray-400 ml-2">Typing...</span>
  </div>
));

// Error Boundary Fallback
export const ErrorFallback = memo(({ error, resetError }) => (
  <div className="min-h-screen flex items-center justify-center bg-transparent">
    <div className="text-center space-y-4 max-w-md mx-auto px-4">
      <div className="w-16 h-16 mx-auto mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Oops! Something went wrong</h3>
        <p className="text-gray-400 text-sm">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="text-red-400 cursor-pointer text-sm">Error Details</summary>
            <pre className="text-xs text-red-300 mt-2 p-2 bg-red-900/20 rounded overflow-auto">
              {error?.message}
            </pre>
          </details>
        )}
      </div>

      <button
        onClick={resetError}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Try Again
      </button>
    </div>
  </div>
));

export default {
  LoadingSpinner,
  PageLoader,
  SkeletonCard,
  SkeletonText,
  ProgressBar,
  TypingIndicator,
  ErrorFallback,
};