import { useRef } from 'react';
//custom hooks
import useEventListener from '../../customHooks/UseEventListener';

const EventListenerHookPage = () => {
  const dialogRef = useRef();

  const closeDialog = (event) => {
    if (event.defaultPrevented) {
      // Do nothing if the event was already processed
      return;
    }
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      console.log('Click outside detected -> closing dialog...');
      //trigger function to close the dialog
    }
  };

  // Event listener to close dialog on click outside element
  useEventListener('mousedown', closeDialog);

  return (
    <div className="magnify-container">
      <p>
        This hook allows you to attach the required event to the required target (default is window)
        and remove it on unmount
      </p>
      <p>Open the dev tools to see the console output</p>
      <div ref={dialogRef} style={{ border: '1px solid black' }}>
        <p>click outside</p>
      </div>
    </div>
  );
};

export default EventListenerHookPage;
