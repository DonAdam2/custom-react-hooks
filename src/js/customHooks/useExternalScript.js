import { useEffect, useRef, useState } from 'react';
//constants
import { availableExternalEntityStatuses } from '@/js/constants/AppConstants';

function setAttributes(script, attrs) {
  for (const attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function useExternalScript({ src, immediate = true, attrs }) {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(
      src ? availableExternalEntityStatuses.loading : availableExternalEntityStatuses.idle
    ),
    attrsRef = useRef(attrs);

  useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the script URL passed to this hook.
      if (!src || !immediate) {
        setStatus(availableExternalEntityStatuses.idle);
        return;
      }
      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      let script = document.querySelector(`script[src="${src}"]`);
      if (!script) {
        // Create script
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', availableExternalEntityStatuses.loading);
        // Add script to document body
        document.body.appendChild(script);
        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            'data-status',
            event.type === 'load'
              ? availableExternalEntityStatuses.ready
              : availableExternalEntityStatuses.error
          );
        };
        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute('data-status'));
      }
      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event) => {
        setStatus(
          event.type === 'load'
            ? availableExternalEntityStatuses.ready
            : availableExternalEntityStatuses.error
        );
      };
      // Add event listeners
      if (script) {
        attrsRef.current && setAttributes(script, attrsRef.current);
        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);
      }
      // Remove event listeners on cleanup
      return () => {
        if (script && immediate) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src, immediate] // Only re-run effect if script src changes
  );
  return status;
}

export default useExternalScript;

//typescript
/*export type status = 'idle' | 'loading' | 'ready' | 'error';

export interface ExternalEntityInterface {
  src: string;
  immediate?: boolean;
  attrs?: AttrsInterface;
}

export interface AttrsInterface {
  [key: string]: string;
}


function setAttributes(script: HTMLScriptElement, attrs: AttrsInterface) {
  for (const attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}
function useExternalScript({ src, immediate = true, attrs }: ExternalEntityInterface) {
  const [status, setStatus] = useState<status>(
      src ? availableExternalEntityStatuses.loading : availableExternalEntityStatuses.idle
    ),
    attrsRef = useRef(attrs);
  useEffect(() => {
    if (!src || !immediate) {
      setStatus(availableExternalEntityStatuses.idle);
      return;
    }
    let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', availableExternalEntityStatuses.loading);
      document.body.appendChild(script);
      const setAttributeFromEvent = (event: any) => {
        if (script) {
          script.setAttribute(
            'data-status',
            event.type === 'load'
              ? availableExternalEntityStatuses.ready
              : availableExternalEntityStatuses.error
          );
        }
      };
      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    } else {
      const currentStatus = script.getAttribute('data-status') as status;
      setStatus(currentStatus);
    }
    const setStateFromEvent = (event: any) => {
      setStatus(
        event.type === 'load'
          ? availableExternalEntityStatuses.ready
          : availableExternalEntityStatuses.error
      );
    };
    if (script) {
      attrsRef.current && setAttributes(script, attrsRef.current);
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);
    }
    return () => {
      if (script && immediate) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src, immediate]);
  return status;
}

export default useExternalScript;*/
