import { useEffect } from 'react';

/*interface IUseEnterEscButtonsProps {
  cancelHandler: Function;
  confirmHandler: Function;
}*/

// export const useEnterEscButtonsHook = ({ cancelHandler, confirmHandler }: IUseEnterEscButtonsProps) => {

function useEnterEscButtonsHook({ cancelHandler, confirmHandler }) {
  useEffect(() => {
    // const listener = (event: { code: string; preventDefault: () => void }) => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        confirmHandler();
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [confirmHandler]);

  useEffect(() => {
    // const listener = (event: { code: string; preventDefault: () => void }) => {
    const listener = (event) => {
      if (event.code === 'Escape') {
        cancelHandler();
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [cancelHandler]);
}

export default useEnterEscButtonsHook;
