import { useCallback, useEffect, useRef, useState } from 'react';
//toast
import { toast } from 'react-toastify';
//copy to clipboard
import copy from 'copy-to-clipboard';

function useCopyToClipboard() {
  const timeoutRef = useRef(null),
    [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      toast.success('Copied successfully');
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback((text) => {
    if (typeof text === 'string' || typeof text == 'number') {
      copy(text.toString());
      setIsCopied(true);
    } else {
      setIsCopied(false);
      console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`);
    }
  }, []);

  return { isCopied, handleCopy };
}

export default useCopyToClipboard;

//typescript
/*function useCopyToClipboard() {
  const timeoutRef = useRef<any>(null),
    [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      toast.success('Copied successfully');
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied, t]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback((text: number | string) => {
    copy(text.toString());
    setIsCopied(true);
  }, []);

  return { isCopied, handleCopy };
}*/
