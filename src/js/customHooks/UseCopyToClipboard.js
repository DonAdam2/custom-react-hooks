import { useCallback, useEffect, useRef, useState } from 'react';
//toast
import { toast } from 'react-toastify';
//copy to clipboard
import copy from 'copy-to-clipboard';
//constants
import { setTimeoutRAF } from '../constants/Helpers';

const useCopyToClipboard = () => {
  const [isCopied, setCopied] = useState(false),
    cancelCopyTimer = useRef(() => {}),
    registerCancelCopyTimer = (fn) => (cancelCopyTimer.current = fn);

  useEffect(() => {
    if (isCopied) {
      toast.success('Copied successfully');
      setTimeoutRAF(
        () => {
          setCopied(false);
        },
        3000,
        registerCancelCopyTimer
      );
    }

    return () => {
      cancelCopyTimer.current();
    };
  }, [isCopied]);

  const handleCopy = useCallback((text) => {
    if (typeof text === 'string' || typeof text == 'number') {
      copy(text.toString());
      setCopied(true);
    } else {
      setCopied(false);
      console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`);
    }
  }, []);

  return [isCopied, handleCopy];
};

export default useCopyToClipboard;
