import { useCallback } from 'react';
//custom hooks
import useExternalScript from '@/js/customHooks/useExternalScript';
import useExternalStyle from '@/js/customHooks/useExternalStyle';
//constants
import { availableExternalEntityStatuses } from '@/js/constants/AppConstants';

const ScriptPage = () => {
  const scriptStatus = useExternalScript({
      src: 'https://cdn.moyasar.com/mpf/1.7.3/moyasar.js',
    }),
    styleStatus = useExternalStyle({
      src: 'https://cdn.moyasar.com/mpf/1.7.3/moyasar.css',
    });

  const onRefChange = useCallback(
    (node) => {
      if (
        node !== null &&
        scriptStatus === availableExternalEntityStatuses.ready &&
        styleStatus === availableExternalEntityStatuses.ready
      ) {
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
    [scriptStatus, styleStatus]
  );

  return (
    <div className="magnify-container">
      <p>
        This hook makes it super easy to dynamically load an external script and know when its
        loaded. This is useful when you need to interact with a 3rd party library (Stripe, Google
        Analytics, etc) and you'd prefer to load the script when needed rather then include it in
        the document head for every page request.
      </p>
      <h3>
        Script status: <b>{scriptStatus}</b>
      </h3>
      <h3>
        Style status: <b>{styleStatus}</b>
      </h3>
      {scriptStatus === availableExternalEntityStatuses.ready &&
        styleStatus === availableExternalEntityStatuses.ready && (
          <div className="mysr-form" ref={onRefChange} />
        )}
    </div>
  );
};

export default ScriptPage;
