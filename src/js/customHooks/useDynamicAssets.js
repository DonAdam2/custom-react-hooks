import { useEffect, useState } from 'react';

/**
 * Custom hook for dynamically loading CSS and JS assets
 * @param {Object} options - Configuration options
 * @param {boolean} [options.condition] - When to load assets. If undefined, loads automatically. If defined, loads based on its boolean value.
 * @param {string} [options.cssUrl] - URL/path to CSS file
 * @param {string} [options.jsUrl] - URL/path to JS file
 * @param {string} options.id - Unique identifier for the assets
 * @param {string} [options.globalVariableName] - Global variable name to check if JS is loaded
 * @returns {Object} Hook return object
 * @returns {boolean} returns.isLoading - Whether assets are currently loading
 * @returns {boolean} returns.isLoaded - Whether assets have been loaded successfully
 * @returns {Error|null} returns.error - Any error that occurred during loading
 */
export const useDynamicAssets = (options) => {
  const { condition, cssUrl, jsUrl, id, globalVariableName } = options;

  const [isLoading, setIsLoading] = useState(false),
    [isLoaded, setIsLoaded] = useState(false),
    [error, setError] = useState(null);

  useEffect(() => {
    // If condition is undefined, load automatically (treat as true)
    // If condition is defined, use its boolean value
    const shouldLoad = condition === undefined ? true : Boolean(condition);

    if (!shouldLoad) {
      // Clean up when condition is false
      if (cssUrl) {
        const cssLink = document.getElementById(`${id}-css`);
        if (cssLink) {
          document.head.removeChild(cssLink);
        }
      }

      if (jsUrl) {
        const jsScript = document.getElementById(`${id}-js`);
        if (jsScript) {
          document.head.removeChild(jsScript);
        }
      }

      if (globalVariableName && window[globalVariableName]) {
        delete window[globalVariableName];
      }

      setIsLoaded(false);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Load assets when condition is true
    const loadAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if already loaded via global variable
        if (globalVariableName && window[globalVariableName]) {
          setIsLoaded(true);
          setIsLoading(false);
          return;
        }

        const promises = [];

        // Load CSS if provided
        if (cssUrl) {
          const cssPromise = new Promise((resolve, reject) => {
            const existingLink = document.getElementById(`${id}-css`);
            if (existingLink) {
              resolve();
              return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssUrl;
            link.id = `${id}-css`;
            link.onload = () => {
              resolve();
            };
            link.onerror = () => {
              reject(new Error(`Failed to load CSS: ${cssUrl}`));
            };
            document.head.appendChild(link);
          });
          promises.push(cssPromise);
        }

        // Load JS if provided
        if (jsUrl) {
          const jsPromise = new Promise((resolve, reject) => {
            const existingScript = document.getElementById(`${id}-js`);
            if (existingScript) {
              resolve();
              return;
            }

            const script = document.createElement('script');
            script.src = jsUrl;
            script.id = `${id}-js`;
            script.defer = true;
            script.onload = () => {
              resolve();
            };
            script.onerror = () => {
              reject(new Error(`Failed to load JS: ${jsUrl}`));
            };
            document.head.appendChild(script);
          });
          promises.push(jsPromise);
        }

        // Wait for all assets to load
        await Promise.all(promises);

        setIsLoaded(true);
        setIsLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        setIsLoading(false);
      }
    };

    // Ensure DOM is ready before loading assets
    let isCancelled = false;

    const executeLoad = () => {
      if (isCancelled) return;

      // Use setTimeout to ensure this runs after the current execution stack
      setTimeout(() => {
        if (!isCancelled) {
          loadAssets();
        }
      }, 0);
    };

    // Check if document is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', executeLoad);
    } else {
      executeLoad();
    }

    // Cleanup function
    return () => {
      isCancelled = true;
      document.removeEventListener('DOMContentLoaded', executeLoad);

      // Remove assets from head when component unmounts
      if (cssUrl) {
        const cssLink = document.getElementById(`${id}-css`);
        if (cssLink) {
          document.head.removeChild(cssLink);
        }
      }

      if (jsUrl) {
        const jsScript = document.getElementById(`${id}-js`);
        if (jsScript) {
          document.head.removeChild(jsScript);
        }
      }

      if (globalVariableName && window[globalVariableName]) {
        delete window[globalVariableName];
      }
    };
  }, [condition, cssUrl, jsUrl, id, globalVariableName]);

  return {
    isLoading,
    isLoaded,
    error,
  };
};
