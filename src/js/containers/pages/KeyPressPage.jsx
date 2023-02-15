import useKeyPress from '@/js/customHooks/useKeyPress';

const KeyPressPage = () => {
  const happyPress = useKeyPress('h');
  const sadPress = useKeyPress('s');
  const robotPress = useKeyPress('r');
  const foxPress = useKeyPress('f');

  return (
    <div className="magnify-container">
      <p>
        This hook makes it easy to detect when the user is pressing a specific key on their
        keyboard.
      </p>
      <p>Press any of the following on your keyboard => h, s, r, f</p>
      <div>
        {happyPress && '😊'}
        {sadPress && '😢'}
        {robotPress && '🤖'}
        {foxPress && '🦊'}
      </div>
    </div>
  );
};

export default KeyPressPage;
