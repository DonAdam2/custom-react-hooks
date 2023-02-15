import useEnterEscButtonsHook from '@/js/customHooks/useEnterEscEvents';
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
      <p>
        Open the console and press <strong>enter</strong> or <strong>esc</strong> buttons on your
        keyboard to see events triggered
      </p>
    </div>
  );
};

export default EnterEscEventsPage;
