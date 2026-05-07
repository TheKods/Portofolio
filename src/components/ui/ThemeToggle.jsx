import React, { createContext, useContext, useEffect, useState, memo } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setThemeMode = (mode) => {
    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    } else {
      setTheme(mode);
    }
  };

  // Listen for system theme changes when in system mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a theme
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme || savedTheme === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    theme,
    toggleTheme,
    setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme Toggle Button Component
export const ThemeToggle = memo(({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={`p-2 rounded-lg bg-gray-200 dark:bg-gray-800 ${className}`}>
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`group relative p-3 rounded-xl bg-gray-900/50 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-110 hover:shadow-2xl ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

      <div className="relative flex items-center justify-center">
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:rotate-12" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400 transition-transform duration-300 group-hover:rotate-12" />
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
});

// Advanced Theme Selector Component
export const ThemeSelector = memo(({ className = "" }) => {
  const { theme, setThemeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'light', label: 'Light', icon: Sun, color: 'text-yellow-500' },
    { id: 'dark', label: 'Dark', icon: Moon, color: 'text-blue-500' },
    { id: 'system', label: 'System', icon: Monitor, color: 'text-gray-500' },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-3 rounded-xl bg-gray-900/50 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
        aria-label="Theme selector"
      >
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

        <div className="relative flex items-center justify-center">
          {theme === 'dark' && <Moon className="w-5 h-5 text-blue-400" />}
          {theme === 'light' && <Sun className="w-5 h-5 text-yellow-400" />}
          {theme === 'system' && <Monitor className="w-5 h-5 text-gray-400" />}
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl z-50">
            {themes.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => {
                  setThemeMode(id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                  theme === id ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${theme === id ? 'text-blue-400' : color}`} />
                <span className="text-sm">{label}</span>
                {theme === id && (
                  <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

export default ThemeProvider;