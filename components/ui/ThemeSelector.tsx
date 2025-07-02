"use client";

import React, { useState, useEffect } from 'react';

const themes = [
  { name: 'Cyber Green', class: '', primary: '#a3e635', secondary: '#3b82f6', accent: '#9333ea' },
  { name: 'Ocean Breeze', class: 'theme-ocean', primary: '#06b6d4', secondary: '#0ea5e9', accent: '#8b5cf6' },
  { name: 'Sunset Glow', class: 'theme-sunset', primary: '#f97316', secondary: '#ec4899', accent: '#f59e0b' },
  { name: 'Purple Haze', class: 'theme-purple', primary: '#a855f7', secondary: '#ec4899', accent: '#3b82f6' },
  { name: 'Forest Green', class: 'theme-forest', primary: '#22c55e', secondary: '#10b981', accent: '#06b6d4' },
  { name: 'Monochrome', class: 'theme-mono', primary: '#ffffff', secondary: '#6b7280', accent: '#374151' },
];

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme') || '';
      setCurrentTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
  }, []);

  const changeTheme = (themeClass: string) => {
    setCurrentTheme(themeClass);
    if (typeof window !== 'undefined') {
      document.documentElement.className = themeClass;
      localStorage.setItem('portfolio-theme', themeClass);
    }
    setIsOpen(false);
  };

  const currentThemeData = themes.find(theme => theme.class === currentTheme) || themes[0];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 glass-card rounded-xl border border-white/10 hover:border-lime-400/50 transition-all duration-300 group"
          aria-label="Change Theme"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: currentThemeData.primary }}
              ></div>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: currentThemeData.secondary }}
              ></div>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: currentThemeData.accent }}
              ></div>
            </div>
            <svg 
              className={`w-4 h-4 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Theme Options */}
        {isOpen && (
          <div className="absolute top-full mt-2 right-0 min-w-[200px] glass-card rounded-xl border border-white/10 p-2 animate-slide-up">
            <h3 className="text-sm font-semibold text-white mb-3 px-2">Choose Theme</h3>
            <div className="space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => changeTheme(theme.class)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    currentTheme === theme.class ? 'bg-white/10 border border-white/20' : ''
                  }`}
                >
                  <div className="flex gap-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: theme.primary }}
                    ></div>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: theme.secondary }}
                    ></div>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: theme.accent }}
                    ></div>
                  </div>
                  <span className="text-sm text-white">{theme.name}</span>
                  {currentTheme === theme.class && (
                    <svg className="w-4 h-4 text-green-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSelector; 