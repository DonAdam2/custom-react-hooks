//custom hooks
import useBoolean from '../../customHooks/UseBoolean';

const BooleanHookPage = () => {
  const [show, setShow] = useBoolean(true);

  return (
    <div className="magnify-container">
      <p>
        This hook takes a parameter with value true or false and gives you 3 functionalities
        (toggle, on and off) also returns the current boolean value.
      </p>
      <button className="button" onClick={setShow.toggle}>
        Toggle
      </button>
      <button className="button" onClick={setShow.on}>
        Show
      </button>
      <button className="button" onClick={setShow.off}>
        Hide
      </button>
      {show && <p>I'm the content</p>}
    </div>
  );
};

export default BooleanHookPage;
