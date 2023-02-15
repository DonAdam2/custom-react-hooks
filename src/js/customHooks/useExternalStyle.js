import { useEffect, useState } from 'react';
//constants
import { availableExternalEntityStatuses } from '@/js/constants/AppConstants';

function useExternalStyle({ src, immediate = true }) {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(
    src ? availableExternalEntityStatuses.loading : availableExternalEntityStatuses.idle
  );

  useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the link URL passed to this hook.
      if (!src || !immediate) {
        setStatus(availableExternalEntityStatuses.idle);
        return;
      }
      // Fetch existing link element by href
      // It may have been added by another instance of this hook
      let linkTag = document.querySelector(`link[href="${src}"]`);
      if (!linkTag) {
        // Create link
        linkTag = document.createElement('link');
        linkTag.rel = 'stylesheet';
        linkTag.type = 'text/css';
        linkTag.href = src;
        linkTag.setAttribute('data-status', availableExternalEntityStatuses.loading);

        // Add link to document head
        document.head.appendChild(linkTag);
        // Store status in attribute on link
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event) => {
          linkTag.setAttribute(
            'data-status',
            event.type === 'load'
              ? availableExternalEntityStatuses.ready
              : availableExternalEntityStatuses.error
          );
        };
        linkTag.addEventListener('load', setAttributeFromEvent);
        linkTag.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing link status from attribute and set to state.
        setStatus(linkTag.getAttribute('data-status'));
      }
      // (Link) event handler to update status in state
      // Note: Even if the link already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event) => {
        setStatus(
          event.type === 'load'
            ? availableExternalEntityStatuses.ready
            : availableExternalEntityStatuses.error
        );
      };

      // Add event listeners
      if (linkTag) {
        linkTag.addEventListener('load', setStateFromEvent);
        linkTag.addEventListener('error', setStateFromEvent);
      }
      // Remove event listeners on cleanup
      return () => {
        if (linkTag && immediate) {
          linkTag.removeEventListener('load', setStateFromEvent);
          linkTag.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src, immediate] // Only re-run effect if link src changes
  );
  return status;
}

export default useExternalStyle;
