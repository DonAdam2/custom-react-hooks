import { useEnterEscButtonsHook } from '@/js/customHooks/useEnterEscEvents';

const EnterEscEventsPage = () => {
  useEnterEscButtonsHook({ cancelHandler, confirmHandler });

  function cancelHandler() {
    console.log('Cancel function triggered on esc');
  }

  function confirmHandler() {
    console.log('Confirm function triggered on enter');
  }
  return (
    <div className="magnify-container">
      Open the console and press enter or esc buttons on your keyboard to see events triggered
    </div>
  );
};

export default EnterEscEventsPage;
