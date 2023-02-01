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
  useEventListener('mousedown', closeDialog, window);

  return (
    <div className="magnify-container">
      <div ref={dialogRef} style={{ border: '1px solid black' }}>
        <p>click outside</p>
      </div>
    </div>
  );
};

export default EventListenerHookPage;
