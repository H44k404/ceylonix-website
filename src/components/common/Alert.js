import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Alert = ({ type = 'success', title, message, onClose, autoClose = true, autoCloseDuration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const alertRef = useRef(null);

  useEffect(() => {
    // Scroll page to top when alert appears so user can see it
    if (isVisible) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [isVisible]);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, onClose]);

  if (!isVisible) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div
      ref={alertRef}
      className={`fixed top-20 right-4 z-50 max-w-md animate-in slide-in-from-top-2 fade-in duration-300`}
    >
      <div
        className={`rounded-lg p-4 shadow-lg border ${
          isSuccess
            ? 'bg-green-500/10 border-green-500/30 backdrop-blur-sm'
            : isError
            ? 'bg-red-500/10 border-red-500/30 backdrop-blur-sm'
            : 'bg-blue-500/10 border-blue-500/30 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-0.5">
            {isSuccess && (
              <CheckCircle
                className={`w-6 h-6 ${isSuccess ? 'text-green-400' : ''}`}
              />
            )}
            {isError && (
              <AlertCircle
                className={`w-6 h-6 ${isError ? 'text-red-400' : ''}`}
              />
            )}
          </div>
          <div className="flex-1">
            {title && (
              <h3
                className={`font-semibold mb-1 ${
                  isSuccess
                    ? 'text-green-200'
                    : isError
                    ? 'text-red-200'
                    : 'text-blue-200'
                }`}
              >
                {title}
              </h3>
            )}
            {typeof message === 'string' ? (
              <p
                className={`text-sm ${
                  isSuccess
                    ? 'text-green-100/90'
                    : isError
                    ? 'text-red-100/90'
                    : 'text-blue-100/90'
                }`}
              >
                {message}
              </p>
            ) : (
              <div
                className={`text-sm ${
                  isSuccess
                    ? 'text-green-100/90'
                    : isError
                    ? 'text-red-100/90'
                    : 'text-blue-100/90'
                }`}
              >
                {message}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose && onClose();
            }}
            className={`flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors ${
              isSuccess
                ? 'text-green-300 hover:bg-green-500/20'
                : isError
                ? 'text-red-300 hover:bg-red-500/20'
                : 'text-blue-300 hover:bg-blue-500/20'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
