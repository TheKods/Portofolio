import React from "react";

const LayoutContext = React.createContext(null);

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <LayoutContext.Provider value={{}}>{children}</LayoutContext.Provider>
    </div>
  );
}

Layout.Header = function Header({ children, className = "" }) {
  return (
    <header className={`sticky top-0 z-50 ${className}`}>{children}</header>
  );
};

Layout.Main = function Main({ children, className = "" }) {
  return <main className={className}>{children}</main>;
};

Layout.Footer = function Footer({ children, className = "" }) {
  return <footer className={`mt-8 ${className}`}>{children}</footer>;
};
