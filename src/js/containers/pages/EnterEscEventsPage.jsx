import { useEnterEscButtonsHook } from '@/js/customHooks/useEnterEscEvents';
import { useCallback } from 'react';

const EnterEscEventsPage = () => {
  const cancelHandler = useCallback(() => {
    console.log('Cancel function triggered on esc');
  }, []);

  const confirmHandler = useCallback(() => {
    console.log('Confirm function triggered on enter');
  }, []);

  useEnterEscButtonsHook({ cancelHandler, confirmHandler });

  return (
    <div className="magnify-container">
      Open the console and press enter or esc buttons on your keyboard to see events triggered
    </div>
  );
};

export default EnterEscEventsPage;
