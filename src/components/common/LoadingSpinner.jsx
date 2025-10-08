import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ 
  size = 'md', 
  className = '', 
  text = '',
  fullScreen = false 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const spinner = (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
      {text && (
        <span className="ml-2 text-gray-600 dark:text-gray-400">{text}</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          {text && (
            <p className="text-gray-600 dark:text-gray-400">{text}</p>
          )}
        </div>
      </div>
    );
  }

  return spinner;
}

// Componente para botones con loading
export function LoadingButton({ 
  loading = false, 
  children, 
  disabled = false,
  className = '',
  ...props 
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`relative ${className} ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading && (
        <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin" />
      )}
      <span className={loading ? 'ml-6' : ''}>
        {children}
      </span>
    </button>
  );
}
