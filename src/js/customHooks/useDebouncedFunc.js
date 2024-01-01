import { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

function useDebouncedFunc(callback, delay) {
  const debouncedFn = useRef(debounce(callback, delay));

  useEffect(() => {
    debouncedFn.current = debounce(callback, delay);
  }, [delay, callback]);

  return debouncedFn.current;
}

export default useDebouncedFunc;
