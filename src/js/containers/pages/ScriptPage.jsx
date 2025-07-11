import { useCallback, useState } from 'react';
//custom hooks
import { useDynamicAssets } from '@/js/customHooks/useDynamicAssets';
import Button from '@/js/components/shared/Button';

const ScriptPage = () => {
  const [loadAssets, setLoadAssets] = useState(false);
  const { isLoading, isLoaded, error } = useDynamicAssets({
    condition: loadAssets,
    cssUrl: 'https://cdn.moyasar.com/mpf/1.7.3/moyasar.css',
    jsUrl: 'https://cdn.moyasar.com/mpf/1.7.3/moyasar.js',
    id: 'moyasar',
    globalVariableName: 'Moyasar',
  });

  const onRefChange = useCallback(
    (node) => {
      if (node !== null && isLoaded && window.Moyasar) {
        window.Moyasar?.init({
          element: '.mysr-form',
          language: 'en',
          amount: 123,
          currency: 'SAR',
          description: 'Testing moyasar',
          publishable_api_key: 'pk_test_AQpxBV31a29qhkhUYFYUFjhwllaDVrxSq5ydVNui',
          callback_url: 'https://localhost:3000/moyasar-form',
          methods: ['creditcard'],
        });
      }
    },
    [isLoaded]
  );

  const renderContent = () => {
    if (error) {
      return (
        <div className="error-wrapper">
          <div className="error-icon-wrapper">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="m12 17 .01 0" />
            </svg>
          </div>
          <p className="error-title">Failed to load payment form.</p>
          <p className="error-message">{error.message}</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="loading-wrapper">
          <div className="separator" />
          <span>Loading payment form...</span>
        </div>
      );
    }

    if (isLoaded) {
      return <div className="mysr-form" ref={onRefChange} />;
    }

    return null;
  };

  return (
    <div className="magnify-container script-page-wrapper">
      <p className="title">
        This hook makes it super easy to dynamically load external CSS and JavaScript assets:
      </p>
      <ul className="features-list">
        <li>Full control over when assets are loaded</li>
        <li>Loading states, error handling, and automatic cleanup</li>
        <li>
          Three loading modes: conditionally, automatically on render (if no condition), or manually
        </li>
        <li>
          Perfect for 3rd party libraries (Stripe, Google Analytics, payment processors, etc.)
        </li>
        <li>Prevents bundle bloat and unnecessary script loading on every page</li>
      </ul>
      <Button
        onClick={() => setLoadAssets((prev) => !prev)}
        label="Load Moyasar Payment Form"
        variant="white"
        className="load-assets-button"
      />
      {renderContent()}
    </div>
  );
};

export default ScriptPage;
